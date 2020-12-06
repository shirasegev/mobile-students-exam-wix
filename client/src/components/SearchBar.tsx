import React from 'react';
import '../App.scss';
import {createApiClient} from '../api';

export type SearchBarState = {
	search: string,
}

type Props = {
    onSearchChange: Function;
};

export const api = createApiClient();

export class SearchBarComponent extends React.PureComponent<Props, SearchBarState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            search: '',
        };
    }

	searchDebounce: any = null;

	onSearchChange = async (search: string, newPage?: number) => {
		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.props.onSearchChange(search);
        }, 300);
        this.setState({
            search: search,
        });
	};

	render() {
		return (
            <header>
                <input type='search' placeholder='Search' onChange={(e) => this.onSearchChange(e.target.value)}/>
            </header>
		)
	}

}

export default SearchBarComponent;