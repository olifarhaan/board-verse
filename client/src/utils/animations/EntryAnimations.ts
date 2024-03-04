// export const DEFAULT_EASE = [0.6, 0.01, -0.05, 0.9];
export const DEFAULT_EASE = [0.6, 0.01, 0.05, 0.9];

export const EntryAnimation = {
  from: {
    y: -30,
    opacity: 0,
    transition: {
      ease: DEFAULT_EASE,
      duration: 0.2,
    },
  },

  to: {
    y: 0,
    opacity: 1,
    transition: {
      ease: DEFAULT_EASE,
      duration: 0.2,
    },
  },
};
