import React from 'react';
import '../App.scss';

export type SortState = {
    sortBy: string;
};

type Props = {
    onSort: Function;
};

export class SortComponent extends React.Component<Props, SortState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            sortBy: '',
        };
    }

    // Part C
    render () {
        return (
            <div className={'sort'}>
                <h4>Sort by: </h4>
                <div className={'sortingButtons'}>
                    <button className='sortButton' onClick={() => this.sort('')} disabled={this.state.sortBy === '' ? true : false}>
                        None
                    </button>
                    <button className='sortButton' onClick={() => this.sort('name')} disabled={this.state.sortBy === 'name' ? true : false}>
                        Name
                    </button>
                    <button className='sortButton' onClick={() => this.sort('date')} disabled={this.state.sortBy === 'date' ? true : false}>
                        Date
                    </button>
                </div>
            </div>
        );
    }

    sort = async (value: string) => {
        this.props.onSort(value);
        this.setState({
            sortBy: value,
        });
    };
}

export default SortComponent;