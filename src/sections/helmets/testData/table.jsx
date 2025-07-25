import React from "react";
export default function TableDailyReport() {
  return (
    <div className="container bootdey">
      <div className="row invoice row-printable">
        <div className="col-md-10">
          <div className="panel panel-default plain" id="dash_0">
            <div className="panel-body p30">
              <div className="row">
                <div className="col-lg-6">
                  <div className="invoice-logo"></div>
                  {/* <div className="invoice-logo"><img width="100" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Invoice logo"></div> */}
                </div>

                <div className="col-lg-6">
                  <div className="invoice-from">
                    <ul className="list-unstyled text-right">
                      <li>Dash LLC</li>
                      <li>2500 Ridgepoint Dr, Suite 105-C</li>
                      <li>Austin TX 78754</li>
                      <li>VAT Number EU826113958</li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="invoice-details mt25">
                    <div className="well">
                      <ul className="list-unstyled mb0">
                        <li>
                          <strong>Invoice</strong> #936988
                        </li>
                        <li>
                          <strong>Invoice Date:</strong> Monday, October 10th,
                          2015
                        </li>
                        <li>
                          <strong>Due Date:</strong> Thursday, December 1th,
                          2015
                        </li>
                        <li>
                          <strong>Status:</strong>{" "}
                          <span className="label label-danger">UNPAID</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="invoice-to mt25">
                    <ul className="list-unstyled">
                      <li>
                        <strong>Invoiced To</strong>
                      </li>
                      <li>Jakob Smith</li>
                      <li>Roupark 37</li>
                      <li>New York, NY, 2014</li>
                      <li>USA</li>
                    </ul>
                  </div>
                  <div className="invoice-items">
                    <div
                      className="table-responsive"
                      style="overflow: hidden; outline: none;"
                      tabIndex="0"
                    >
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="per70 text-center">Description</th>
                            <th className="per5 text-center">Qty</th>
                            <th className="per25 text-center">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              1024MB Cloud 2.0 Server - elisium.dynamic.com
                              (12/04/2014 - 01/03/2015)
                            </td>
                            <td className="text-center">1</td>
                            <td className="text-center">$25.00 USD</td>
                          </tr>
                          <tr>
                            <td>Logo design</td>
                            <td className="text-center">1</td>
                            <td className="text-center">$200.00 USD</td>
                          </tr>
                          <tr>
                            <td>
                              Backup - 1024MB Cloud 2.0 Server -
                              elisium.dynamic.com
                            </td>
                            <td className="text-center">12</td>
                            <td className="text-center">$12.00 USD</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colSpan="2" className="text-right">
                              Sub Total:
                            </th>
                            <th className="text-center">$237.00 USD</th>
                          </tr>
                          <tr>
                            <th colSpan="2" className="text-right">
                              20% VAT:
                            </th>
                            <th className="text-center">$47.40 USD</th>
                          </tr>
                          <tr>
                            <th colSpan="2" className="text-right">
                              Credit:
                            </th>
                            <th className="text-center">$00.00 USD</th>
                          </tr>
                          <tr>
                            <th colSpan="2" className="text-right">
                              Total:
                            </th>
                            <th className="text-center">$284.4.40 USD</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div className="invoice-footer mt25">
                    <p className="text-center">
                      Generated on Monday, October 08th, 2015{" "}
                      <a href="#" className="btn btn-default ml15">
                        <i className="fa fa-print mr5"></i> Print
                      </a>
                    </p>
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
