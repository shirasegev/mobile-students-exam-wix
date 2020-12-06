import React from 'react';
import '../App.scss';

export type FilterState = {
    selectedFulfillmentOption: string,
	selectedPaymentOption: string,
};

type Props = {
    onFulfillmentFilter: Function,
    onPaymentFilter: Function;
};

export class FilterComponent extends React.Component<Props, FilterState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedFulfillmentOption: '',
            selectedPaymentOption: '',
        };
    }

    // Part B 3
    render () {
        return (
            <div className={'filters'}>
                <div className={'filter'}>
                    <h4>Fulfillment filter: </h4>
                    {this.showFulfillmentFilterOptions()}
                </div>
                <div className={'filter'}>
                    <h4>Payment filter: </h4>
                    {this.showPaymentFilterOptions()}
                </div>
            </div>	
        );
    }

    // // Part B 3
    // render () {
    //     return (
    //         <div className={'filter'}>
    //             <select className={'selectpicker'} onChange={(e) => this.handleFilterChanged(e.target.value)}>
    //                 this.props.values.keys.map((key) => {
    //                     <option value={key}>{this.props.values[key]}</option>
    //                 })
    //             </select>
    //         </div>
    //     );
    // }

    showFulfillmentFilterOptions = () => {
        return (
            <select className={'selectpicker'} onChange={(e) => this.handleFulfillmentOptionChange(e.target.value)}>
                <option value=''>				All orders				</option>
                <option value='fulfilled'>		Delivered orders		</option>
                <option value='not-fulfilled'>	Not delivered orders	</option>
                <option value='canceled'>		Canceled orders			</option>
            </select>
        )
    };

    handleFulfillmentOptionChange = (fulfillmentFilter: string) => {
        this.props.onFulfillmentFilter(fulfillmentFilter);
        this.setState({
            selectedFulfillmentOption: fulfillmentFilter,
        });
    }

    showPaymentFilterOptions = () => {
        return (
            <select className={'selectpicker'} onChange={(e) => this.handlePaymentOptionChange(e.target.value)}>
                <option value=''>			All orders			</option>
                <option value='paid'>		Paid orders			</option>
                <option value='not-paid'>	Not paid orders		</option>
                <option value='refunded'>	Refunded orders		</option>
            </select>
        )
    };

    handlePaymentOptionChange = (paymentFilter: string) => {
        this.props.onPaymentFilter(paymentFilter);
        this.setState({
            selectedPaymentOption: paymentFilter,
        });
    }
}

export default FilterComponent;