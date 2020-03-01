import React from 'react';
import './Page404.scss';

const Page404 = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="xs-12 md-6 mx-auto content">
          <div id="countUp">
            <div className="number" data-count="404">
              404
            </div>
            <div className="text">Page not found</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
