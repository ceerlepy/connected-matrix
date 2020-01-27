import React, { PureComponent } from "react";
import GridButton from "../gridButton";
import Matrix from "../../util/matrix";

export default class Grid extends PureComponent {
  state = {
    clicked: false,
    hovered: false,
    targetRowIndex: 0,
    targetColIndex: 0,
    resolvedMap: null,
    matrixSize: 0,
    filledColor: "red",
    hoverColor: "yellow",
    grid: []
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const {
      matrixSize: p_matrixSize,
      filledColor: p_filledColor,
      hoverColor: p_hoverColor
    } = nextProps;
    const {
      matrixSize: s_matrixSize,
      filledColor: s_filledColor,
      hoverColor: s_hoverColor
    } = prevState;

    if (
      p_matrixSize === s_matrixSize &&
      p_filledColor === s_filledColor &&
      p_hoverColor === s_hoverColor
    ) {
      return null;
    }

    let matrix = new Matrix(p_matrixSize, p_matrixSize);
    let resolvedMap = matrix.resolveMatrix();
    return {
      clicked: prevState.clicked,
      hovered: prevState.hovered,
      targetRowIndex: prevState.targetRowIndex,
      targetColIndex: prevState.targetColIndex,
      resolvedMap,
      matrixSize: p_matrixSize,
      filledColor: p_filledColor,
      hoverColor: p_hoverColor,
      grid: matrix.getGrid()
    };
  };

  onClickButton = (targetRowIndex, targetColIndex) => {
    this.setState(prevState => ({
      clicked: true,
      hovered: false,
      targetRowIndex: targetRowIndex,
      targetColIndex: targetColIndex,
      resolvedMap: prevState.resolvedMap,
      matrixSize: prevState.matrixSize,
      filledColor: prevState.filledColor,
      hoverColor: prevState.hoverColor,
      grid: prevState.grid
    }));
  };

  onHoverButton = (targetRowIndex, targetColIndex) => {
    this.setState(prevState => ({
      clicked: false,
      hovered: true,
      targetRowIndex: targetRowIndex,
      targetColIndex: targetColIndex,
      resolvedMap: prevState.resolvedMap,
      matrixSize: prevState.matrixSize,
      filledColor: prevState.filledColor,
      hoverColor: prevState.hoverColor,
      grid: prevState.grid
    }));
  };

  onHoverLeft = () => {
    this.setState(prevState => ({
      clicked: false,
      hovered: false,
      targetRowIndex: prevState.targetRowIndex,
      targetColIndex: prevState.targetColIndex,
      resolvedMap: prevState.resolvedMap,
      matrixSize: prevState.matrixSize,
      filledColor: prevState.filledColor,
      hoverColor: prevState.hoverColor,
      grid: prevState.grid
    }));
  };

  render() {
    const {
      resolvedMap,
      targetRowIndex,
      targetColIndex,
      clicked,
      hovered,
      filledColor,
      hoverColor,
      grid
    } = this.state;

    let connectedArr = [];
    if (hovered && resolvedMap) {
      connectedArr = resolvedMap.get(`${targetRowIndex},${targetColIndex}`);
    }

    let connectedItemSize = 0;
    if (clicked && resolvedMap) {
      let arr = resolvedMap.get(`${targetRowIndex},${targetColIndex}`);
      if (arr) {
        connectedItemSize = arr.length;
      }
    }

    let comp = null;
    if (grid !== null) {
      comp = grid.map((gridRow, rowIndex) => {
        const gridRowComp = gridRow.map((item, colIndex) => {
          let isHovered = false;
          if (hovered) {
            if (connectedArr) {
              isHovered = connectedArr.find(item => {
                return item.x === rowIndex && item.y === colIndex;
              });
            }
          }

          let isClicked = false;
          if (
            !hovered &&
            rowIndex === targetRowIndex &&
            colIndex === targetColIndex
          ) {
            isClicked = true;
          }

          return (
            <GridButton
              key={colIndex}
              value={item.val}
              connectedItemSize={connectedItemSize}
              onClick={this.onClickButton}
              onHover={this.onHoverButton}
              onHoverLeft={this.onHoverLeft}
              isHovered={isHovered}
              isClicked={isClicked}
              rowIndex={rowIndex}
              colIndex={colIndex}
              filledColor={filledColor}
              hoverColor={hoverColor}
            />
          );
        });

        return (
          <div style={{ flex: 1 }} key={rowIndex}>
            {gridRowComp}
          </div>
        );
      });
    }

    return <React.Fragment>{comp}</React.Fragment>;
  }
}
