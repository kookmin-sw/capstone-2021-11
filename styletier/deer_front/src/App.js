
import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import './reset.css'
import AuthContext from "./store";
import { Home, 
         Shop,
         Seller, 
         Product, 
         ProductIndi, 
         Login, 
         Signup, 
         SellerIndi, 
         MainToSeller, 
         Contact, 
         Payment, 
         Cart, 
         Cash,
         Approve,
         Order,
         Agreement,
         MyPage } from './pages';
import Appbar from './components/common/AppBar'
import FooterBtn from './components/common/FooterBtn'
import Footer from './components/common/Footer'
import Media from 'react-media'
const MEDIA_QUERIES = {
  mob: '(max-width: 480px)',
  pc: '(min-width: 480px)'
}

function App() {

    const [state, actions] = useContext(AuthContext);
    const initializeUserInfo = async () => {
        const token = window.sessionStorage.getItem("token");
        if(!token) return;
        
        actions.setLoginState(true);
        //const { UserActions } = this.props;
        //UserActions.setLoggedInfo(loggedInfo);
        try {
            //await UserActions.checkStatus();
            //여기에 토큰 유효성 체크 API 호출해야 함
        } catch (e) {
            console.log(e);
            //alert('세션이 만료되었습니다. 재로그인 해주세요')
            window.sessionStorage.clear();
            //window.location.href = '/auth/login?expired';
        }
    }

    useEffect(() => {
        console.log('렌더링이 완료되었습니다!');
        initializeUserInfo();;
      },[]);
    
    return (
        <Media queries={MEDIA_QUERIES}>
            {matches => {
                return(
                <>
                {matches.pc &&
                <div className="App" style={{backgroundColor: 'black', color: 'white', paddingTop: '67px'}}>                
                    <Router>
                        <Appbar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/shop" component={Shop}/>
                        {/* <Route path="/seller" component={Seller} /> */}
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/mypage" component={MyPage} />
                        <Route
                            exact
                            path="/shop/:id"
                            id="number"
                            component={Product}
                        />
                        <Route
                            path="/shop/indiv/:id"
                            id="number"
                            component={ProductIndi}
                        />
        
                        <Route exact path="/seller" component={Seller} />
                        <Route path="/seller/:name" component={SellerIndi} />
                        {/* <Route path="/seller/tmp" component={MainToSeller} /> */}
                        <Route path="/contact" component={Contact}/>
                        <Route path="/Agreement" component={Agreement}/>

                        <Route path="/payment/:order_id" component={Payment}/>
                        <Route path="/cash/:order_id" component={Cash}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/approve/:order_id" component={Approve}/>
                        <Route path="/order" component={Order}/>
                    </Router>
                
                    <FooterBtn/>
                    <Footer/>
                </div>
                }
                {matches.mob &&
                <div className="App" style={{backgroundColor: 'black', color: 'white', paddingTop: '58.97px'}}>                
                    <Router>
                        <Appbar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/shop" component={Shop}/>
                        {/* <Route path="/seller" component={Seller} /> */}
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/mypage" component={MyPage} />
                        <Route
                            exact
                            path="/shop/:id"
                            id="number"
                            component={Product}
                        />
                        <Route
                            path="/shop/indiv/:id"
                            id="number"
                            component={ProductIndi}
                        />
        
                        <Route exact path="/seller" component={Seller} />
                        <Route path="/seller/:name" component={SellerIndi} />
                        <Route path="/seller/tmp" component={MainToSeller} />
                        <Route path="/contact" component={Contact}/>
                        <Route path="/Agreement" component={Agreement}/>

                        <Route path="/payment/:order_id" component={Payment}/>
                        <Route path="/cash/:order_id" component={Cash}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/approve/:order_id" component={Approve}/>
                        <Route path="/order" component={Order}/>
                    </Router>
                
                    <FooterBtn/>
                    <Footer/>
                </div>
                }
                </>
                )
            }}
        </Media>
        
    );
}

export default App;
