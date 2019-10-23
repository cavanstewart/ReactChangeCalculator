import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountDue: "0",
      amountReceived: "0",
      changeDue: "0",
      twenties: "0",
      tens: "0",
      fives: "0",
      ones: "0",
      quarters: "0",
      dimes: "0",
      nickels: "0",
      pennies: "0"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value
    });
  }

  calculate(s) {
    const received = Number(s.amountReceived);
    const due = Number(s.amountDue);

    let totalChange = received - due;

    const twentyChange = Math.round((totalChange - (totalChange % 20))/20);
    let remainingChange = totalChange - twentyChange*20;

    const tenChange = Math.round((remainingChange - (remainingChange % 10))/10);
    remainingChange -= tenChange*10;

    const fiveChange = Math.round((remainingChange - (remainingChange % 5))/5);
    remainingChange -= fiveChange*5;

    const oneChange = Math.round(remainingChange - (remainingChange % 1));
    remainingChange -= oneChange;

    const quarterChange = Math.round(
      (remainingChange - (remainingChange % 0.25)) / 0.25
    );
    remainingChange -= quarterChange * 0.25;

    const dimeChange = Math.round(
      (remainingChange - (remainingChange % 0.1)) / 0.1
    );
    remainingChange -= dimeChange * 0.1;

    const nickelChange = Math.round(
      (remainingChange - (remainingChange % 0.05)) / 0.05
    );
    remainingChange -= nickelChange * 0.05;

    const pennyChange = Math.round(remainingChange / 0.01);

    this.setState({
      changeDue: totalChange,
      twenties: twentyChange,
      tens: tenChange,
      fives: fiveChange,
      ones: oneChange,
      quarters: quarterChange,
      dimes: dimeChange,
      nickels: nickelChange,
      pennies: pennyChange
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Change Calculator</h3>
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-header">Enter Information</div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="amount-due">How much money is due?</label>
                  <input
                    onChange={this.handleChange}
                    name="amountDue"
                    id="amount-due"
                    className="form-control"
                    type="number"
                    placeholder="Amount Due"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount-received">
                    How much was received?
                  </label>
                  <input
                    onChange={this.handleChange}
                    name="amountReceived"
                    id="amount-received"
                    className="form-control"
                    type="number"
                    placeholder="Amount Received"
                  />
                </div>
              </div>
              <div className="card-footer">
                <button
                  id="calculate-change"
                  className="btn btn-primary"
                  onClick={() => this.calculate(this.state)}
                >
                  <span className="button-text">Calculate Change</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card">
              <div className="card-body">
                {this.state.changeDue >= 0 ? (
                  <div className="alert alert-success" role="alert">
                    The total change due is ${this.state.changeDue}
                  </div>
                ) : (
                  <div className="alert alert-danger" role="alert">
                    Nope
                  </div>
                )}

                <div className="container">
                  <div className="row">
                    <div className="col-3">
                      <div className="card">
                      <div className="card-header">twenties</div>
                        <div className="change">{this.state.twenties}</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="card">
                      <div className="card-header">tens</div>
                        <div className="change">{this.state.tens}</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="card">
                      <div className="card-header">fives</div>
                        <div className="change">{this.state.fives}</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="card">
                      <div className="card-header">ones</div>
                        <div className="change">{this.state.ones}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <div className="card">
                      <div className="card-header">quarters</div>
                        <div className="change">{this.state.quarters}</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="card">
                      <div className="card-header">dimes</div>
                        <div className="change">{this.state.dimes}</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="card">
                      <div className="card-header">nickels</div>
                        <div className="change">{this.state.nickels}</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="card">
                        <div className="card-header">pennies</div>
                        <div className="change">{this.state.pennies}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
