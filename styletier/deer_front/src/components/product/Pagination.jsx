import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props; // 상품 개수, 한 페이지에 보여줄 상품 개수

  const pageCount = Math.ceil(itemsCount / pageSize); // 몇 페이지가 필요한지 계산
  if (pageCount === 1) return null; // 1페이지 뿐이라면 페이지 수를 보여주지 않음

  const pages = _.range(1, pageCount + 1); // 마지막 페이지에 보여줄 컨텐츠를 위해 +1

  return (
    <nav style={{marginLeft: '50%', transform: 'translate(-50%, -50%)'}}> {/* VSCode 입력: nav>ul.pagination>li.page-item>a.page-link */}
      <ul className="pagination">
        {pages.map(page => (
          <li 
            key={page} 
            className={page === currentPage ? "page-item active" : "page-item"} // 부트스트랩
            style={{ cursor: "pointer" }}>
              <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;