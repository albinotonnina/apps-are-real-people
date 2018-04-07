import React from 'react';
import ReactDOM from 'react-dom';

class Line extends React.Component {
  state = {
    ticker: 0,
    count: 0
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const getNextState = (nextProps, prevState) => {
      let count = nextProps.loop
        ? prevState.direction === 'down'
          ? prevState.count - 1
          : prevState.count + 1
        : Math.min(nextProps.maxCount, prevState.count + 1)

      let direction =
        prevState.count === nextProps.maxCount - 1
          ? 'down'
          : prevState.count === 1 ? 'up' : prevState.direction

      return {
        ticker: nextProps.tick,
        count,
        direction
      }
    }

    return nextProps.tick === prevState.ticker + nextProps.speed
      ? getNextState(nextProps, prevState)
      : null
  }

  shouldComponentUpdate = (_, nextState) => nextState.count !== this.state.count

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.state.count + 1)}
      </React.Fragment>
    )
  }
}


const drawing = {
  fig1: ' 🔴',
  fig2: ' ⬜️',
  data: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
}



class MoveIt extends React.Component {
  state = {
    tick: 0
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.requestAnimationFrame(() => {
      this.setState(_prevState => ({tick: _prevState.tick + 1}))
    })
  }

  componentDidMount() {
    this.setState({tick: 0})
  }

  render = () => (
    <React.Fragment>
      <Line tick={this.state.tick} speed={2} maxCount={20} loop={true}>
        {count => (
          <React.Fragment>
            {[...Array(count - 1)].map((_, r) => {
              return (
                <React.Fragment key={r}>
                  {`${[...Array(count - 1)]
                    .map((_, c) => {
                      return drawing.data[r][c] === 1
                        ? drawing.fig1
                        : drawing.fig2
                    })
                    .join('')}`}
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )}
      </Line>

      <i />
    </React.Fragment>
  )
}

ReactDOM.render(
  <React.Fragment>
      <MoveIt />
  </React.Fragment>,
  document.getElementById('root')
);
