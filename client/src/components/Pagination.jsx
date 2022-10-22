import React from "react";
import { useSelector, useDispatch  } from "react-redux";
import { setPage } from "../global/actions";


const PagiButton = ({page}) => {
    const dispatch = useDispatch();
    const current = useSelector(state=>state.page);
    return <span key={page} className={page===current?"pag__button__current":"pag__button"} onClick={()=>{
        document.querySelector(".bg").scrollTo(0,0);
        dispatch(setPage(page))
    }}>{page+1}</span>
}

const Pagination = ({items}) => {
    const dispatch = useDispatch();
    const current = useSelector(state=>state.page)
    const pages = Math.ceil(items/15);
    
    const movePage = (page) => {
        document.querySelector(".bg").scrollTo(0,0);
        dispatch(setPage(page));
    }

    return <div className="pagination">
        <div className="pagination__bar">
            {current>=1?<span className="pag__button" onClick={()=>movePage('prev')}>{'<'}</span>:null}
            {Array.from(new Array(pages).keys()).map(page=><PagiButton page={page} key={page}/>)}
            {current+1<Math.ceil(items/15)?<span className="pag__button" onClick={()=>movePage('next')}>{'/>'}</span>:null}
        </div>
    </div>
};

export default Pagination;