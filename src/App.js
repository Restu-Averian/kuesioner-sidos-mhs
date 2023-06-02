/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Layout, Result, Row, Typography } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import FormQ from "./components/FormQ";
import LoadingComponent from "./components/LoadingComponent";
import dbFs from "./firebase";
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";

const App = () => {
  const [isLsExist, setIsLsExist] = useState(false);
  const [ipData, setIpData] = useState("");
  const [arrDatasFromFb, setArrDatasFromFb] = useState([]);
  const [isLoadingFields, setIsLoadingFields] = useState(true);
  const [eventMusicState, setEventMusicState] = useState("pause");

  const audio = document.getElementById("audio");

  const fetchIp = async () => {
    try {
      const response = await fetch("https://api.ipify.org/?format=json");
      const jsonData = await response.json();
      setIpData(jsonData?.ip);
    } catch {
      window?.location?.reload();
    }
  };

  const readDataHandler = async () => {
    getDocs(collection(dbFs, "questions"))
      ?.then((res) => {
        fetchIp();

        res?.forEach((data) => {
          setArrDatasFromFb([...new Set([...arrDatasFromFb, data?.data()])]);
        });
      })
      .finally(() => setIsLoadingFields(false));
  };

  const playingMusicHandler = (event) => {
    event === "play" ? audio?.play() : audio?.pause();
    setEventMusicState(event);
  };

  useEffect(() => {
    setIsLsExist(localStorage?.getItem("IS_FILLED_KUESIONER"));
  }, [isLsExist]);

  useEffect(() => {
    readDataHandler();
  }, []);

  return (
    <Fragment>
      {isLoadingFields ? (
        <LoadingComponent />
      ) : (
        <Fragment>
          {isLsExist ||
          localStorage?.getItem("USER") ||
          arrDatasFromFb?.some((ele) => ele?.ip === ipData) ? (
            <Result
              status="success"
              title={`Terima kasih ${
                localStorage?.getItem("USER") ||
                arrDatasFromFb?.find((data) => data?.ip === ipData)?.q1
              } `}
            />
          ) : (
            <Layout.Content className="sd-main-content">
              <Row gutter={[16, 32]} justify="center">
                <Col span={24} style={{ textAlign: "center" }}>
                  <Typography.Title>
                    Survey Dosen Pembimbing Jurusan TI PNP 2022/2023
                  </Typography.Title>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Typography.Text style={{ fontSize: 18 }} underline>
                        Kalian ga bakal aku cepuin kok ke dospem kalian, JANJI !
                      </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Typography.Text style={{ marginRight: 14 }}>
                        Sambil denger musik deh biar chill juga
                      </Typography.Text>
                      <audio id="audio">
                        <source src="https://g.top4top.io/m_27083mwf31.mp3" />
                        Your browser does not support the audio element.
                      </audio>
                      {eventMusicState === "pause" ? (
                        <Button
                          icon={
                            <PlayCircleFilled
                              style={{
                                fontSize: 24,
                                color: "#4096ff",
                              }}
                            />
                          }
                          onClick={() => playingMusicHandler("play")}
                          size="large"
                          style={{
                            borderColor: "white",
                          }}
                        />
                      ) : (
                        <Button
                          icon={
                            <PauseCircleFilled
                              style={{
                                fontSize: 24,
                                color: "#4096ff",
                                border: "none",
                              }}
                            />
                          }
                          onClick={() => playingMusicHandler("pause")}
                          size="large"
                          style={{
                            borderColor: "white",
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Card>
                    <FormQ ipData={ipData} />
                  </Card>
                </Col>
              </Row>
            </Layout.Content>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default App;
