# React + Konva Assessment

The Vecteezy editor uses a combination of React, Konva.JS, and MobX State Tree.

This assessment introduces concepts critical to Konva design applications.

Expected Time: 5 hours

## Commands

`yarn` - Install dependencies

`yarn dev` - Run development environment

`yarn build` - Bundle complete application

## Tasks

- Allow the stars to be dragged +

- Allow any given star to be selected with a Konva transfomer +

  - Customize the visual appearance of the transformer +
  - Clicking the background should deselect +

- Add a toolbar component with the following features: +

  - A slider that adjusts the number of points for the currently selected star +
  - A input that adjusts the fill color of the currently selected star +
  - A button to download the current design as JSON +
  - A button to allow uploading a JSON file from the previous step and resume editing +

- Resume editing must restore all the following data: +

  - Position +
  - Rotation +
  - Scale +
  - Fill +
  - Number of Points +

- Add a Generate Preview button +

  - When pressed convert the current artboard to an image
  - Use javascript + canvas to convert the image to black and white. +
    - For assessment purposes please do not use CSS to display in black and white. +
  - Display the image in a preview window in the corner +

## Documentation

https://konvajs.org/docs/index.html

https://konvajs.org/api/Konva.html

https://konvajs.org/api/Konva.Transformer.html

https://konvajs.org/api/Konva.Stage.html

https://mobx-state-tree.js.org/concepts/trees

## Mockup

Here is an example of a completed assessment by Eezy developers

![Assessment Mockup](https://github.com/eezyinc/react-konva-assessment/raw/master/mockup.png)
