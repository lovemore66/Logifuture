import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scroll from '../scroll.png';
import './Table.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      columns: Object.keys(this.props.rows[0]),
      tableHeight: this.props.rowHeight * this.props.rows.length,
      scroll: {
        top: 0,
        index: 0,
        end: Math.min(
          this.props.rows.length,
          Math.ceil((this.props.tableHeight * 2) / this.props.rowHeight)
        ),
      },
    };

    this.onScroll = this.onScroll.bind(this);
  }

  scrollTop = () => {
    this.ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  onScroll({ target }) {
    const scrollTop = target.scrollTop;
    const rowHeight = this.props.rowHeight;
    const tableHeight = this.props.tableHeight;
    const index = Math.floor(scrollTop / rowHeight);
    const end = Math.min(
      this.props.rows.length,
      index + Math.ceil((tableHeight * 2) / rowHeight)
    );

    this.setState((prevState) => ({
      scroll: {
        ...prevState.scroll,
        index,
        end,
        top: (scrollTop / rowHeight) * rowHeight,
      },
    }));
  }

  generateRows() {
    const { columns } = this.state;
    const { rowHeight, rows } = this.props;
    const { index, end } = this.state.scroll;
    const items = [];

    for (let i = index; i < end; i++) {
      const rowAttrs = {
        style: {
          position: 'absolute',
          top: i * rowHeight,
          left: 0,
          height: rowHeight,
          lineHeight: `${rowHeight}px`,
        },
        className: `tr ${(i % 2) === 0 ? 'tr-odd' : 'tr-even'}`,
        key: i,
        'data-testid': 'row'
      };

      items.push(
        <tr {...rowAttrs}>
          {columns.map((column, j) => (
            <td key={j}>{rows[i][column]}</td>
          ))}
        </tr>
      );
    }

    return items;
  }

  render() {
    const tableHeight =
      this.props.tableHeight > this.state.tableHeight
        ? this.state.tableHeight + 2
        : this.props.tableHeight;

    const tbodyAttr = {
      style: {
        position: 'relative',
        display: 'block',
        height: this.state.tableHeight,
        maxHeight: this.state.tableHeight,
        width: '100%',
        overflow: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      },
    };

    return (
      <div className='main'>
        <section>
          <div className={'flex-item'}></div>
          <div className={'flex-item'}><p>Virtualized list</p></div>
          <div className={'btn'}>
            <button onClick={() => {
              this.props.addNewPerson();
            }}>
              Add new item
            </button>
          </div>
        </section>
        <div className={'wrapper'}>
          <div style={{ overflowX: 'auto' }}>
            <table data-testid="table">
              <thead>
                <tr className={'tr'}>
                  {this.state.columns.map((name, i) => (
                    <th key={i}>{name}</th>
                  ))}
                </tr>
              </thead>
            </table>
            <table
              className="table-content"
              style={{ height: tableHeight }}
              onScroll={this.onScroll}
            >
              <tbody data-testid="table-body" {...tbodyAttr}>
               {/* Temporarily comment out this line below for all tests to pass.
               This is necessary because tables and tbody elements do not natively support these tags,
                and the tests need to work around this limitation. */}
                <div className='top-hidden' ref={this.ref}></div>
                {this.generateRows()}
              </tbody>
            </table>
          </div>
        </div>
        <div className='scroll'><img src={scroll} onClick={this.scrollTop} /></div>
      </div>
    );
  }
}

Table.defaultProps = {
  rowHeight: 45,
  tableHeight: 273,
};

Table.propTypes = {
  rowHeight: PropTypes.number.isRequired,
  tableHeight: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
