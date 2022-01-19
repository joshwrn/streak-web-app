import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

interface Props {
  radius: number;
  stroke: number;
  progress: number;
}

const CircularProgress: React.FC<Props & React.HTMLProps<SVGCircleElement>> = ({
  radius,
  stroke,
  progress,
}) => {
  const [normalizedRadius, setNormalizedRadius] = useState(0);
  const [circumference, setCircumference] = useState(0);
  const [strokeDashOffset, setStrokeDashOffset] = useState(0);

  useEffect(() => {
    setNormalizedRadius(radius - stroke * 2);
  }, [radius, stroke]);

  useEffect(() => {
    setCircumference(normalizedRadius * 2 * Math.PI);
  }, [normalizedRadius]);

  useEffect(() => {
    setStrokeDashOffset(circumference - (progress / 100) * circumference);
  }, [circumference, progress]);

  return (
    <svg height={radius * 2} width={radius * 2}>
      {/* @ts-ignore */}
      <Circle
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDashoffset={strokeDashOffset}
      />
    </svg>
  );
};

const Circle = styled.circle<{ strokeDashOffset: number }>`
  stroke-dashoffset: ${({ strokeDashOffset }) => strokeDashOffset};
  transition: stroke-dashoffset 1s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke: ${({ theme }) => theme.focus.dial};
`;

export default CircularProgress;
