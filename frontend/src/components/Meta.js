import { Helmet } from 'react-helmet';

import React from 'react';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Proshop',
  keywords: 'electronics, buy electronics, cheap electronincs',
  description: 'We sell the best products for cheap',
};

export default Meta;
