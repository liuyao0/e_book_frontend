import React from 'react';
import './me.css'
import {Order} from "../order/order";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {GrayLine} from "../indexcomponent/indexcomponent";
import {ptBR} from "@material-ui/core/locale";
import {UserTable} from "../userList/usertable";
import {BookManager} from "../bookmanager/bookmanager";
import {Ranking} from "../ranking/ranking";
import {OrdinaryStatistics} from "../ordinarystatistics/ordinarystatistics";
import {server_ip}  from '../../../App'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    whited:{
        backgroundColor:'#ddd',
    }

}));

export default function SimpleTabs(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes=useStyles();
    const renderTab=()=>{

        let rows=[];
        if(props.user_type===0) {
            rows.push(<Tab label="我的订单" {...a11yProps(0)} />);
            rows.push(<Tab label="用户管理" {...a11yProps(1)} />);
            rows.push(<Tab label="图书管理" {...a11yProps(2)} />);
            rows.push(<Tab label="订单查询" {...a11yProps(3)} />);
            rows.push(<Tab label="统计" {...a11yProps(4)} />);
            rows.push(<Tab label="购书统计" {...a11yProps(5)} />);
            }
        if(props.user_type===1){
            rows.push(<Tab label="我的订单" {...a11yProps(0)} />);
            rows.push(<Tab label="购书统计" {...a11yProps(1)} />);
        }
        return rows;
    }

    const renderTabPanel=()=>{
        let rows=[]
        if(props.user_type===0){
            rows.push(<TabPanel value={value} index={0}>
                    <Order user_id={props.user_id} showUserName={false}/>
                </TabPanel>
            );
            rows.push(<TabPanel value={value} index={1}>
                <UserTable/>
            </TabPanel>
           );
            rows.push(<TabPanel value={value} index={2}>
                <BookManager/>
                </TabPanel>
            );
            rows.push(<TabPanel value={value} index={3}>
                    <Order user_id={props.user_id} showUserName={true}/>
                </TabPanel>
            );
            rows.push(<TabPanel value={value} index={4}>
                <Ranking/>
            </TabPanel>);
            rows.push(<TabPanel value={value} index={5}>
                <OrdinaryStatistics user_id={props.user_id}/>
            </TabPanel>);
        }
        if(props.user_type===1){
            rows.push(<TabPanel value={value} index={0}>
                    <Order user_id={props.user_id} showUserName={false}/>
                </TabPanel>
            );
            rows.push(<TabPanel value={value} index={1}>
                <OrdinaryStatistics user_id={props.user_id}/>
            </TabPanel>);
        }
        return rows;
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{height:"auto",background:"#2fa39d"}} >
                <Tabs value={value} onChange={handleChange} classes={{indicator:classes.whited}}>
                    {renderTab()}
                </Tabs>
            </AppBar>
            {renderTabPanel()}
        </div>
    );
}



class Me extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            value:null,
            onFilterByName:false,
            onFilterByDate:false,
            name:null,
            dateBegin:null,
            dateEnd:null
        };
    }

    renderMain=()=>{
        return (
            <div>
                <SimpleTabs user_type={this.props.user_type} user_id={this.props.user_id}/>
            </div>
        )
    }

    render=()=>{
        return (
            <div>
                <div style={{width:'90%',margin:'0 auto',position:"relative",height:'auto',
                    borderLeft:'1px solid #e5e5e5',
                    borderRight:'1px solid #e5e5e5',
                    borderBottom:'1px solid #e5e5e5'
                }}>
                    {this.renderMain()}
                </div>
            </div>
    );

    }

}

export {Me};
