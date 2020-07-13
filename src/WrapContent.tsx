import React, { CSSProperties } from 'react';
import { Layout } from 'antd';

const WrapContent: React.FC<{
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  contentHeight?: number | string;
}> = (props) => {
  const { style, className, children } = props;
  return (
    <Layout.Content className={className} style={style}>
      <div className="ant-pro-basicLayout-children-content-wrap">
       {children}
      </div>
    </Layout.Content>
  );
};

export default WrapContent;
