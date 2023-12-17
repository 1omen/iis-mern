import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React from "react";

export const Profile = () => {
    const userData = useSelector((state) => state.auth.data);

    const currentModule = userData?.currentModule;

    let tests = userData?.tests;

    const examResult = tests && tests.length >= 11 ? (
        <p>Результат экзамена: {tests[10] * 100 + "%"}</p>
    ) : null;

    const examButton = tests && tests.length === 10 ? (
        <Link to="/exam" className="btn btn-outline-success btn-lg">Пройти экзамен</Link>
    ) : null;

    const continueButton = tests && tests.length < 10 ? (
        <Link to={"/modules/" + currentModule} className="btn btn-outline-secondary btn-lg">Продолжить обучение</Link>
    ) : null;

    if (tests && tests.length === 11) {
        tests = tests.slice(0, -1);
    }
    let testItems;
    if (tests) {
        testItems = tests.map((test, index) => (
            <li className="list-group-item" key={index}>{test * 100 + "%"}</li>
        ));
    }


    return (
        <div className="col-11 d-flex justify-content-between fs-4">
            <div>
                <p className="">Текущий модуль: {currentModule}</p>
                <ol className="list-group list-group-numbered" style={{maxWidth: '300px'}}>Результаты тестирований:
                    {testItems}
                </ol>
            </div>


            <div>
                <h2>{examResult}</h2>
                {examButton}
                {continueButton}
            </div>
        </div>
    );
}