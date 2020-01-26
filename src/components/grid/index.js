import React, { PureComponent } from "react";
import GridButton from "../gridButton";
import Matrix from "../../util/matrix";

export default class Grid extends PureComponent {
  state = {
    clicked: false,
    hovered: false,
    targetRowIndex: 0,
    targetColIndex: 0,
    resolvedMap: null
  };

  constructor(props) {
    super(props);
    this.matrix = new Matrix(6, 6);
  }

  componentDidMount = async () => {
    let resolvedMap = this.matrix.resolveMatrix();
    this.setState(prevState => ({
      clicked: prevState.clicked,
      hovered: prevState.hovered,
      targetRowIndex: prevState.targetRowIndex,
      targetColIndex: prevState.targetColIndex,
      resolvedMap: resolvedMap
    }));
  };

  onClickButton = (targetRowIndex, targetColIndex) => {
    this.setState(prevState => ({
      clicked: true,
      hovered: false,
      targetRowIndex: targetRowIndex,
      targetColIndex: targetColIndex,
      resolvedMap: prevState.resolvedMap
    }));
  };

  onHoverButton = (targetRowIndex, targetColIndex) => {
    this.setState(prevState => ({
      clicked: false,
      hovered: true,
      targetRowIndex: targetRowIndex,
      targetColIndex: targetColIndex,
      resolvedMap: prevState.resolvedMap
    }));
  };

  onHoverLeft = () => {
    this.setState(prevState => ({
      clicked: false,
      hovered: false,
      targetRowIndex: prevState.targetRowIndex,
      targetColIndex: prevState.targetColIndex,
      resolvedMap: prevState.resolvedMap
    }));
  };

  render() {
    const {
      resolvedMap,
      targetRowIndex,
      targetColIndex,
      clicked,
      hovered
    } = this.state;

    let connectedArr = [];
    if (hovered) {
      connectedArr = resolvedMap.get(`${targetRowIndex},${targetColIndex}`);
    }

    let connectedItemSize = 0;
    if (clicked) {
      let arr = resolvedMap.get(`${targetRowIndex},${targetColIndex}`);
      if (arr) {
        connectedItemSize = arr.length;
      }
    }

    let grid = this.matrix.getGrid();
    const comp = grid.map((gridRow, rowIndex) => {
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
          />
        );
      });

      return (
        <div style={{ flex: 1 }} key={rowIndex}>
          {gridRowComp}
        </div>
      );
    });

    return <React.Fragment>{comp}</React.Fragment>;
  }
}
