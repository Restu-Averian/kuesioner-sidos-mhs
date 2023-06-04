/* eslint-disable react-hooks/exhaustive-deps */
import { Pie } from "@ant-design/charts";
import { Button, Card, Col, Drawer, Grid, Modal, Row, Typography } from "antd";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState, Fragment } from "react";
import dbFs from "../firebase";
import { arrTotQn, configChart } from "../helpers";
import LoadingComponent from "../components/LoadingComponent";

const ModalListAlasanQ2 = ({ state, setState }) => {
  const [arrDatasChart, setArrDatasChart] = useState([]);
  const { xs } = Grid.useBreakpoint();

  const configAlasanQ2 = configChart(arrDatasChart);

  const processChartDatas = () => {
    const count = {};
    for (let i = 0; i < state?.arrAlasanQ2?.length; i++) {
      const objArrAlasan = state?.arrAlasanQ2[i];
      if (count[objArrAlasan]) {
        count[objArrAlasan]++;
      } else {
        count[objArrAlasan] = 1;
      }
    }

    const result = [];
    for (const [key, val] of Object?.entries(count)) {
      result?.push({
        type: key,
        value: val,
      });
    }

    return result;
  };

  useEffect(() => {
    const result = processChartDatas();
    setArrDatasChart(result);
  }, [JSON.stringify(state?.arrAlasanQ2)]);

  return (
    <Fragment>
      {xs ? (
        <Drawer
          title="List alasan pengusulan dosen untuk menjadi dospem tiap mahasiswa"
          open={state.isOpenModalListAlasan}
          onClose={() =>
            setState((prev) => ({ ...prev, isOpenModalListAlasan: false }))
          }
          closable
          bodyStyle={{ padding: "20px 10px" }}
        >
          <Pie
            {...configAlasanQ2}
            legend={{ layout: "vertical", position: "right" }}
          />
        </Drawer>
      ) : (
        <Modal
          title="List alasan pengusulan dosen untuk menjadi dospem tiap mahasiswa"
          open={state.isOpenModalListAlasan}
          onOk={() =>
            setState((prev) => ({ ...prev, isOpenModalListAlasan: false }))
          }
          onCancel={() =>
            setState((prev) => ({ ...prev, isOpenModalListAlasan: false }))
          }
          cancelButtonProps={{
            style: {
              display: "none",
            },
          }}
          width="100vw"
        >
          <Pie
            {...configAlasanQ2}
            legend={{ layout: "vertical", position: "right" }}
          />
        </Modal>
      )}
    </Fragment>
  );
};

const AdminHome = () => {
  const [state, setState] = useState({
    arrDatasFromFb: [],
    Q2BeralasanLength: 0,
    Q2KeinginanLength: 0,
    Q3Sama: 0,
    Q3Beda: 0,
    Q4SamaTopik: 0,
    Q4BedaTopik: 0,
    arrAlasanQ2: [],
    isLoading: false,
    isOpenModalListAlasan: false,
  });

  const { xs } = Grid.useBreakpoint();

  const dataQ2 = [
    {
      type: "Keinginan",
      value: state.Q2KeinginanLength,
    },
    {
      type: "Beralasan",
      value: state.Q2BeralasanLength,
    },
  ];
  const dataQ3 = [
    {
      type: "Beda",
      value: state.Q3Beda,
    },
    {
      type: "Sama",
      value: state.Q3Sama,
    },
  ];
  const dataQ4 = [
    {
      type: "Beda Topik",
      value: state.Q4BedaTopik,
    },
    {
      type: "Sama Topik",
      value: state.Q4SamaTopik,
    },
  ];

  const configQ2 = configChart(dataQ2);
  const configQ3 = configChart(dataQ3);
  const configQ4 = configChart(dataQ4);

  const fetchDataFB = () => {
    const tempArrDatas = [];

    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      getDocs(collection(dbFs, "questions"))
        ?.then((res) => {
          res?.forEach((data) => {
            tempArrDatas?.push(data?.data());
          });

          const arrQ2Keinginan = arrTotQn(tempArrDatas, "q2", "keinginan");
          const arrQ2Beralasan = arrTotQn(tempArrDatas, "q2", "beralasan");
          const arrQ3Beda = arrTotQn(tempArrDatas, "q3", "beda");
          const arrQ3Sama = arrTotQn(tempArrDatas, "q3", "sama");
          const arrQ4BedaTopik = arrTotQn(tempArrDatas, "q4", "ga dibolehin");
          const arrQ4SamaTopik = arrTotQn(tempArrDatas, "q4", "sama");

          const tempArrAlasanQ2 = tempArrDatas
            ?.filter((data) => data?.reason_Q3)
            ?.map((data) => data?.reason_Q3);
          const arrAll_tempArrAlasanQ2 = [];
          tempArrAlasanQ2?.forEach((data) => {
            arrAll_tempArrAlasanQ2?.push(...data);
          });

          setState((prev) => ({
            ...prev,
            arrDatasFromFb: tempArrDatas,
            Q2KeinginanLength: arrQ2Keinginan?.length,
            Q2BeralasanLength: arrQ2Beralasan?.length,
            Q3Beda: arrQ3Beda?.length,
            Q3Sama: arrQ3Sama?.length,
            Q4BedaTopik: arrQ4BedaTopik?.length,
            Q4SamaTopik: arrQ4SamaTopik?.length,
            arrAlasanQ2: arrAll_tempArrAlasanQ2,
          }));
        })
        .catch((e) => {
          Modal.error({
            title: "Error",
            content: JSON.stringify(e),
            onOk: () => window.location.reload(),
          });
        })
        .finally(() => setState((prev) => ({ ...prev, isLoading: false })));
    } catch {
      Modal.error({
        title: "Error",
        content: "Mohon untuk direfresh kembali",
        onOk: () => window.location.reload(),
      });
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // const configQ3 = configChart(dataQ2)

  useEffect(() => {
    fetchDataFB();
  }, []);

  return (
    <Fragment>
      {state.isLoading ? (
        <LoadingComponent />
      ) : (
        <Row
          gutter={[16, 16]}
          justify="center"
          style={{
            textAlign: "center",
            ...(!xs && {
              padding: 50,
            }),
          }}
        >
          <Col span={24} style={{ textAlign: "center" }}>
            <Typography.Title>Report</Typography.Title>
            <Typography.Text>
              Jumlah Responden : {state?.arrDatasFromFb?.length} / 53
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              {/* <Col span/={xs ? 24 : 12}> */}
              <Col span={24}>
                <Card title="Alasan Pengusulan Dosen">
                  <Row>
                    <Col span={24}>
                      <Pie {...configQ2} />
                    </Col>
                    <Col span={24}>
                      <Button
                        type="primary"
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            isOpenModalListAlasan: true,
                          }))
                        }
                      >
                        Alasan Pengusulan Dosen
                      </Button>
                      <ModalListAlasanQ2 state={state} setState={setState} />
                    </Col>
                  </Row>
                </Card>
              </Col>
              {/* <Col span={xs ? 24 : 12}> */}
              <Col span={24}>
                <Card
                  title="Dosen yang Diusulkan Sama/Tidak"
                  style={{ height: "100%" }}
                >
                  <Pie {...configQ3} />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Perbedaan Topik yang Diajukan">
                  <Pie {...configQ4} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              danger
              onClick={() => {
                localStorage.removeItem("user_login");
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default AdminHome;
