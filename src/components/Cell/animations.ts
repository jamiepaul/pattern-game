export function staggeredScaleRotate(index: number) {
  return {
    animate: {
      scale: [0, 1.5, 1],
      rotate: [180, 360, 360],
      transition: {
        duration: 2,
        delay: index * 0.3,
        times: [0, 0.25, 0.5],
      },
    },
    exit: {
      scale: [1, 1.5, 0],
      rotate: [0, 0, 0],
      transition: {
        duration: 1,
        delay: index * 0.15,
        times: [0, 0.25, 0.5],
      },
    },
  };
}
