import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_DURATION = 900;

function parseValue(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return {
      number: value,
      prefix: "",
      suffix: "",
      decimals: 0,
    };
  }

  const textValue = String(value);
  const match = textValue.match(/-?[\d,]+(?:\.\d+)?/);

  if (!match) {
    return null;
  }

  const rawNumber = match[0];
  const number = Number(rawNumber.replace(/,/g, ""));

  if (Number.isNaN(number)) {
    return null;
  }

  const decimalPart = rawNumber.split(".")[1];

  return {
    number,
    prefix: textValue.slice(0, match.index),
    suffix: textValue.slice(match.index + rawNumber.length),
    decimals: decimalPart ? decimalPart.length : 0,
  };
}

function formatAnimatedValue(number, parsedValue) {
  const formattedNumber = number.toLocaleString("en-IN", {
    minimumFractionDigits: parsedValue.decimals,
    maximumFractionDigits: parsedValue.decimals,
  });

  return `${parsedValue.prefix}${formattedNumber}${parsedValue.suffix}`;
}

export default function useAnimatedNumber(value, duration = DEFAULT_DURATION) {
  const parsedValue = useMemo(() => parseValue(value), [value]);

  const [animatedValue, setAnimatedValue] = useState(() => {
    if (!parsedValue) {
      return "";
    }

    return formatAnimatedValue(0, parsedValue);
  });

  const previousNumberRef = useRef(null);

  useEffect(() => {
    if (!parsedValue) {
      previousNumberRef.current = null;
      return undefined;
    }

    const startNumber =
      previousNumberRef.current === null ? 0 : previousNumberRef.current;

    const endNumber = parsedValue.number;
    const startTime = performance.now();
    let animationFrameId = 0;

    function animate(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Smooth ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber =
        startNumber + (endNumber - startNumber) * easedProgress;

      setAnimatedValue(formatAnimatedValue(currentNumber, parsedValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      previousNumberRef.current = endNumber;
      setAnimatedValue(formatAnimatedValue(endNumber, parsedValue));
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [parsedValue, duration]);

  if (!parsedValue) {
    return value || "—";
  }

  return animatedValue;
}