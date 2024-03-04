import rough from "roughjs";

// export const drawPencil = (roughCanvas: any, element: any) => {
//   const { path, stroke } = element;

//   if (path.length < 2) return;

//   roughCanvas.linearPath(path, {
//     stroke,
//     strokeWidth: 3,
//     roughness: 0,
//     simplify: true, // Ensure the path is not overly complex
//   });
// };
export const drawPencil = (roughCanvas: any, element: any) => {
  const { path, stroke } = element;

  if (path.length < 2) return;

  const startingPoint = path[0]; // Get the first element (X, Y) as starting point
  roughCanvas.linearPath(path, {
    stroke,
    strokeWidth: 3,
    roughness: 0,
    simplify: true,
  }, startingPoint);
};



export  const drawLine = (roughCanvas: any, element: any) => {
    const roughGenerator = rough.generator();

    roughCanvas.draw(
      roughGenerator.line(
        element.offsetX,
        element.offsetY,
        element.width as number,
        element.height as number,
        {
          stroke: element.stroke,
          strokeWidth: 2,
          roughness: 0,
        }
      )
    );
  };

export  const drawRect = (roughCanvas: any, element: any) => {
    const roughGenerator = rough.generator();
    roughCanvas.draw(
      roughGenerator.rectangle(
        element.offsetX,
        element.offsetY,
        element.width as number,
        element.height as number,
        {
          stroke: element.stroke,
          strokeWidth: 2,
          roughness: 0,
        }
      )
    );
  };