import React from 'react';

import '../App.scss';

export type PaginationState = {
    page: number,
	totalPages: number,
};

type Props = {
    page: number,
    totalPages: number,
    onChange: Function,
};

export class PaginationComponent extends React.Component<Props, PaginationState> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            page: props.page,
            totalPages: props.totalPages,
        };
    }

    componentDidUpdate(prevProps: Props) {
		if (this.props.page !== prevProps.page || this.props.totalPages !== prevProps.totalPages) {
          this.setState({
              page: this.props.page,
              totalPages: this.props.totalPages,
            });
		}
	  }
    
    // Part C & B1
    render () {
        var page = this.state.page;
        var lastPage = this.state.totalPages;
        return (
        <div>
            <div className={'pagination'}>
                <div className={'paginationCard'}>
                    {lastPage > 7 ? <>
                        <button type='button' className={page === 1 ? 'curr' : 'page'} onClick={() => this.jumptoPage(1)}> 1 </button>

                        {page > 3 ? <>
                            <button type='button' className='prevNext' onClick={() => this.jumptoPage(page -1)}> {'<<'} </button> 
                            {page + 2 < lastPage ? <button type='button' className='page' onClick={() => this.jumptoPage(page -1)}> {page - 1} </button> : null}
                        </> : <>
                            <button type='button' className={page === 2 ? 'curr' : 'page'} onClick={() => this.jumptoPage(2)}> 2 </button>
                            <button type='button' className={page === 3 ? 'curr' : 'page'} onClick={() => this.jumptoPage(3)}> 3 </button>
                            <button type='button' className={page === 4 ? 'curr' : 'page'} onClick={() => this.jumptoPage(4)}> 4 </button>
                            <button type='button' className={page === 5 ? 'curr' : 'page'} onClick={() => this.jumptoPage(5)}> 5 </button>
                        </>
                        }

                        {page > 3 && (page + 2 < lastPage) ? 
                            <button type='button' className='curr'> {page} </button> : null
                        }
                        
                        {page + 2 < lastPage ? <>
                            {page > 3 ? <button type='button' className='page' onClick={() => this.jumptoPage(page + 1)}> {page + 1} </button> : null}
                            <button type='button' className='prevNext' onClick={() => this.jumptoPage(page + 1)}> {'>>'} </button>
                        </> : <>
                            <button type='button' className={page === lastPage - 4 ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage - 4)}> {lastPage - 4} </button>
                            <button type='button' className={page === lastPage - 3 ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage - 3)}> {lastPage - 3} </button>
                            <button type='button' className={page === lastPage - 2 ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage - 2)}> {lastPage - 2} </button>
                            <button type='button' className={page === lastPage - 1 ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage - 1)}> {lastPage - 1} </button>
                        </>
                        }
                        
                        <button type='button' className={page === lastPage ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage)}> {lastPage} </button>
                    </> : <>
                        {lastPage > 1 ? <button type='button' className={page === 1 ? 'curr' : 'page'} onClick={() => this.jumptoPage(1)}> 1 </button> : null}
                        {lastPage > 2 ? <button type='button' className={page === 2 ? 'curr' : 'page'} onClick={() => this.jumptoPage(2)}> 2 </button> : null}
                        {lastPage > 3 ? <button type='button' className={page === 3 ? 'curr' : 'page'} onClick={() => this.jumptoPage(3)}> 3 </button> : null}
                        {lastPage > 4 ? <button type='button' className={page === 4 ? 'curr' : 'page'} onClick={() => this.jumptoPage(4)}> 4 </button> : null}
                        {lastPage > 5 ? <button type='button' className={page === 5 ? 'curr' : 'page'} onClick={() => this.jumptoPage(5)}> 5 </button> : null}
                        {lastPage > 6 ? <button type='button' className={page === 6 ? 'curr' : 'page'} onClick={() => this.jumptoPage(6)}> 6 </button> : null}
                        {lastPage > 7 ? <button type='button' className={page === 7 ? 'curr' : 'page'} onClick={() => this.jumptoPage(7)}> 7 </button> : null}
                    </>}
                </div>
            </div>
        </div>
        );
    };

    jumptoPage = async (val: number) => {
        this.props.onChange(val);
        this.setState({
            page: val,
        });
    };
}

export default PaginationComponent;