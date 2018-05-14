import React, { Component} from "react";
import { connect } from "react-redux";
import { Field, getFormValues} from 'redux-form';
import {getTotalDonation} from "../../services/utils";

class DonationResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let total = getTotalDonation(this.props.form.mode, this.props.form.amount, this.props.form.contribute);

        return (
            <div>
                {
                    this.props.form.method === 'bank-transfer' &&
                    (<div className="payment_option">
                        <h2>Thank you {this.props.form.name}!</h2>
                        <p>
                            100% of your donation will be granted to {this.props.charity ? this.props.charity.name: 'our partner charities'}.
                        </p>
                        <div className="complete-other-info">
                            <p>Here is your <a href={this.props.result.receipt_url} download target="_blank">receipt</a>. We have also emailed it to you &ndash; please check your spam folder if you have not received it.</p>
                        </div>
                        <div className="complete-other-info">
                            <h3>Any questions?</h3>
                            <p>
                                Please email us at <a href="mailto://info@eaa.org.au">info@eaa.org.au</a> or call us on +61 3 9349 4062, if you have any questions.
                            </p>
                        </div>
                        <p>
                            Best wishes and thanks,<br/>
                            The team at Effective Altruism Australia
                        </p>
                    </div>)
                }
                {
                    this.props.form.method !== 'bank-transfer' &&
                    <div className="payment_option">
                        <h2>Thank you {this.props.form.name}!</h2>
                        <p>
                            100% of your donation will be granted to {this.props.charity ? this.props.charity.name: 'our partner charities'}.
                        </p>
                        <div className="complete-next-steps">
                            <h3>What to do next?</h3>
                            <p>
                                Please make sure that you complete the process by
                                {
                                    this.props.form.frequency === 'monthly'
                                        ?
                                        'setting up a monthly periodic payment for '
                                        :
                                        'making a bank transfer of '
                                } ${total} to:
                            </p>
                            <p>
                                <strong>Account Name</strong>: Effective Altruism Australia (don't worry if it doesn't fit)<br/>
                                <strong>BSB</strong>: 083170<br/>
                                <strong>Account No</strong>: 306556167<br/>
                                <strong>Unique Reference Number</strong>: { this.props.result.bank_reference } (put in the transaction description)
                            </p>
                        </div>

                        <div className="complete-other-info">
                            <h3>
                                Receipt
                            </h3>
                            <p>
                                We will send you a tax deductible receipt once we have confirmed the bank transfer.
                            </p>

                            <h3>Any questions?</h3>
                            <p>
                                Please email us at <a href="mailto://info@eaa.org.au">info@eaa.org.au</a> or call us on +61 3 9349 4062, if you have any questions.
                            </p>
                        </div>

                        <div className="complete-other-info">
                            <p>
                                We have also emailed you these instructions &ndash; please check your spam folder if you have not received them.
                            </p>
                        </div>
                        <p>
                            Best wishes and thanks,<br/>
                            The team at Effective Altruism Australia
                        </p>
                    </div>
                }
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            charity: state.charity.currentCharity,
            result: state.result,
            form: getFormValues('donation')(state)
    }
}
)(DonationResult);