type Variant = {
  opacity: number;
  x: string;
};

type Transition = {
  type: string;
  damping: number;
};

type VariantsObject = {
  animate: Variant;
  initial: Variant;
  transition: {
    opacity: Transition;
    x: Transition;
  };
};

export const variants: VariantsObject = {
  animate: {
    opacity: 1,
    x: 'initial',
  },
  initial: {
    opacity: 0,
    x: '100vw',
  },
  transition: {
    opacity: { type: 'spring', damping: 15 },
    x: { type: 'spring', damping: 15 },
  },
};

// {...variants}
//       exit={{ opacity: 0, x: '-100vh', position: 'absolute' }}
