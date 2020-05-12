/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  SettingDrawer,
} from '../../../es/';
import { Select } from 'antd';
import React, { useState } from 'react';
import { HeartTwoTone } from '@ant-design/icons';
import defaultSettings from '../../config/defaultSettings';
import Footer from '@/components/Footer';
import { Link, history, useIntl, useModel } from 'umi';
import logo from '../assets/logo.svg';
import RightContent from '@/components/RightContent';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const [collapsed, handleMenuCollapse] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { settings = defaultSettings } = initialState || {};
  const intl = useIntl();

  return (
    <>
      <ProLayout
        logo={logo}
        menuHeaderRender={
          settings.layout !== 'mix'
            ? (logoDom, titleDom) => (
                <Link to="/">
                  {logoDom}
                  {titleDom}
                </Link>
              )
            : false
        }
        links={[
          <>
            <HeartTwoTone />
            <span>name</span>
          </>,
        ]}
        collapsed={false}
        formatMessage={intl.formatMessage}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) =>
          menuItemProps.isUrl ? (
            defaultDom
          ) : (
            <Link className="qixian-menuItem" to={menuItemProps.path || '/'}>
              {defaultDom}
            </Link>
          )
        }
        rightContentRender={() => <RightContent />}
        onMenuHeaderClick={() => history.push('/')}
        footerRender={() => <Footer />}
        menuExtraRender={({ collapsed }) =>
          !collapsed &&
          props.location?.pathname === '/welcome' && (
            <Select defaultValue="product" size="small" style={{ width: '100%' }}>
              <Select.Option value="product">Product</Select.Option>
              <Select.Option value="dev">Development</Select.Option>
              <Select.Option value="disabled" disabled>
                Preview
              </Select.Option>
              <Select.Option value="test">Test</Select.Option>
            </Select>
          )
        }
        {...props}
        {...settings}
      >
        {props.children}
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          setInitialState({
            ...initialState,
            settings: config,
          })
        }
      />
    </>
  );
};

export default BasicLayout;
