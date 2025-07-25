import { Box } from "@mui/system";
import "./style.css"

export default function EventPrint({ rows1 ,isPrinted , printRef}){
    
    return (
        <>
                  <Box
            style={ { display: isPrinted } }
            ref={ printRef }
            width={ "100%" }
            display="flex"
            justifyContent={ "center" }
            padding={ "30px" }
          >
            <Box dir="ltr">
              <div
                style={ {
                  width: "100%",
                  // maxWidth: "800px",
                  margin: "auto",
                  padding: "16px",
                  border: "1px solid #eee",
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontFamily: "Inter sans-serif",
                  color: "#555",

                  // backgroundColor: "#F9FAFC",
                } }
              >
                <table style={ { fontSize: "12px", lineHeight: "20px" } }>
                  <thead>
                    <tr>
                      <td style={ { padding: " 0 16px 18px 16px " } }>
                        <h1
                          style={ {
                            color: "#1A1C21",
                            fontSize: "18px",
                            fontStyle: "normal",
                            fontWeight: "600",
                            lineHeight: "normal",
                          } }
                        >
                          Jazan Power Plant
                        </h1>
                        <p>Operation D</p>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <table
                          style={ {
                            backgroundColor: "#FFF",
                            padding: "20px 16px",
                            border: "1px solid #D7DAE0",
                            width: "100%",
                            borderRadius: "12px",
                            fontSize: "12px",
                            lineHeight: "20px",
                            tableLayout: "fixed",
                          } }
                        >
                          <tbody>
                            <tr>
                              <td
                                style={ {
                                  verticalAlign: "top",
                                  width: "50%",
                                  paddingRight: "20px",
                                  paddingBottom: "35px",
                                } }
                              >
                                <p
                                  style={ {
                                    fontWeight: "700",
                                    color: "#1A1C21",
                                  } }
                                >
                                  Morning Shift
                                </p>
                                <p
                                  className="ge-ss"
                                  style={ { color: "#5E6470" } }
                                >
                                  جبران المالكي
                                </p>

                                <p
                                  style={ {
                                    fontWeight: "700",
                                    color: "#1A1C21",
                                  } }
                                >
                                  Night Shift
                                </p>
                                <p style={ { color: "#5E6470" } }>محمد حمدي</p>
                              </td>
                              <td
                                style={ {
                                  verticalAlign: "top",
                                  paddingBottom: "35px",
                                  width: "40%",
                                } }
                              >
                                <table
                                  style={ {
                                    tableLayout: "fixed",
                                    width: "-webkit-fill-available",
                                  } }
                                >
                                  <tr>
                                    <th
                                      style={ {
                                        textAlign: "left",
                                        color: "#1A1C21",
                                      } }
                                    >
                                      Date
                                    </th>
                                    <td style={ { textAlign: "right" } }>
                                      30-11-2023
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      style={ {
                                        textAlign: "left",
                                        color: "#1A1C21",
                                      } }
                                    >
                                      Day Name
                                    </th>
                                    <td style={ { textAlign: "right" } }>
                                      Monday
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      style={ {
                                        textAlign: "left",
                                        color: "#1A1C21",
                                      } }
                                    >
                                      Data
                                    </th>
                                    <td style={ { textAlign: "right" } }>
                                      100 Data
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      style={ {
                                        textAlign: "left",
                                        color: "#1A1C21 ",
                                      } }
                                    >
                                      Data
                                    </th>
                                    <td style={ { textAlign: "right" } }>
                                      19:58
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      style={ {
                                        textAlign: "left",
                                        color: "#1A1C21",
                                      } }
                                    >
                                      Data
                                    </th>
                                    <td style={ { textAlign: "right" } }>
                                      20:58
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td colSpan="3">
                                <table
                                  style={ { width: "100%", borderSpacing: "0" } }
                                >
                                  <thead>
                                    <tr style={ { textTransform: "uppercase" } }>
                                      <td
                                        className="ge-ss"
                                        style={ {
                                          
                                          width: "100px",
                                          padding: "8px 0",
                                          border: "1px solid #D7DAE0",
                                          
                                          textAlign: "center",
                                          
                                        } }
                                      >
                                        الموقع
                                      </td>
                                      <td
                                        className="ge-ss"
                                        style={ {
                                          padding: "8px 0",
                                          // borderBlock: "1px solid #D7DAE0",
                                          border: "1px solid #D7DAE0",
                                          width: "100px",
                                          textAlign: "center",
                                        } }
                                      >
                                        الوقت
                                      </td>
                                      <td
                                        className="ge-ss"
                                        style={ {
                                          padding: "8px 0",
                                          // bborderBlock: "1px solid #D7DAE0",
                                          border: "1px solid #D7DAE0",
                                          textAlign: "center",
                                        } }
                                      >
                                        الحدث
                                      </td>
                                      <td
                                        className="ge-ss"
                                        style={ {
                                          padding: "8px 0",
                                          border: "1px solid #D7DAE0",
                                          textAlign: "center",
                                          width: "120px",
                                        } }
                                      >
                                        الحالة
                                      </td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {rows1.map(row =>(
                                      <tr>
                                      <td className="p-taq"> {row.location}</td>
                                      <td className="p-taq">{row.time1}</td>
                                      <td className="p-taq text-left">{row.action}</td>
                                      <td className="p-taq">{row.status1}</td>
                                    </tr>
                                    ))}
                                    
                                  </tbody>
                                  <tfoot>
                                    <tr>
                                      <td
                                        style={ {
                                          padding: " 12px 0",
                                          borderTop: "1px solid #D7DAE0 ",
                                        } }
                                      ></td>
                                      <td
                                        style={ {
                                          borderTop: "1px solid #D7DAE0",
                                        } }
                                        colSpan="3"
                                      ></td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <p style={ { color: "#1A1C21" } }>
                                          (1) Note Todat
                                        </p>
                                        <p style={ { color: "#1A1C21" } }>
                                          (2) Note Today
                                        </p>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={ { paddingtop: "30px" } }>
                        <p style={ { display: "flex", gap: "0 13px" } }>
                          <span style={ { color: "#1A1C21", fontWeight: "700" } }>
                            This Reported By
                          </span>
                          <span>Ali Algamdi</span>
                          <span>86718</span>
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Box>
          </Box>
       


        </>
        )
    }