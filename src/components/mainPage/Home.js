import React from 'react';
import "../../css/homePage.css"

const Home = () => {
    return (
        <div className={"home-content"}>
            <img className={"main_img"} src={require('../../images/TTK.png')}
                 alt={"Error"}/>
            <div className={"text"}>
                Добро пожаловать в Hermes - приложение для обеспечения логистики!
                Здесь вы найдете все необходимые инструменты для оптимизации логистических процессов, управления
                поездками и отслеживания их на карте. Доверьтесь нам, и ваша работа станет более эффективной и
                продуктивной.
                Если хотите начать пользоваться, то пожалуйста авторизуйтесь.
            </div>
        </div>
    );
};

export default Home;