import {Component} from 'react';

class LockScreen extends Component {
    render() {
        return (
            <div>
                <div className="lockscreen">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                </div>
                <div className="unlock-msg">
                    <h3>Press the centre button to unlock!</h3>
                </div>
            </div>
        )
    }

}


export default LockScreen;