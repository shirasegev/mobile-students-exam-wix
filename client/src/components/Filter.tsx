import React from 'react';
import '../App.scss';

export type FilterState = {
    selectedFilter: string,
};

type Props = {
    onFilterChange: Function;
    values: string[][];
};

export class FilterComponent extends React.Component<Props, FilterState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedFilter: '',
        };
    }

    // Part B 3
    render () {
        return (
            <div>
                <select className={'selectpicker'} onChange={(e) => this.onFilterChange(e.target.value)}>
                    {this.props.values.map((option) => 
                        <option value={option[0]} key={option[0]}>{option[1]}</option>
                    )}
                </select>
            </div>
        );
    }

    onFilterChange = (selectedFilter: string) => {
        this.props.onFilterChange(selectedFilter);
        this.setState({
            selectedFilter: selectedFilter,
        });
    }
}

export default FilterComponent;