import { Button, Divider, Form, Grid, Radio, Select, Typography } from "antd";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import dbFs from "../firebase";
import { listOptionNamaMHS } from "../constant";
import { sortArr } from "../helpers";

const FormQ = ({ ipData }) => {
  const [state, setState] = useState({
    reasonQ2: "beralasan",
    reasonQ3: "beda",
    reasonQ4: "ga dibolehin",
    isLoadingSubmitBtn: false,
  });
  const { xs } = Grid.useBreakpoint();

  const onFinish = (values) => {
    setState((prev) => ({ ...prev, isLoadingSubmitBtn: true }));
    addDoc(collection(dbFs, "questions"), { ...values, ip: ipData })
      ?.then(() => {
        window.location.reload();
        localStorage?.setItem("IS_FILLED_KUESIONER", true);
        localStorage?.setItem("USER", values?.q1);
      })
      ?.finally(() =>
        setState((prev) => ({ ...prev, isLoadingSubmitBtn: false }))
      );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const listOptionsQ2 = [
    {
      label: "Keinginan aja sih",
      value: "keinginan",
    },
    {
      label: "Ada alasannya",
      value: "beralasan",
    },
  ];

  const listOptionsQ3 = [
    {
      label: "Sama kok, Res",
      value: "sama",
    },
    {
      label: "Beda",
      value: "beda",
    },
  ];

  const listOptionsQ4 = [
    {
      label: "Sama",
      value: "sama",
    },
    {
      label: "Udah ga dibolehin :(",
      value: "ga dibolehin",
    },
  ];

  const listOptionsReasonQ2 = [
    {
      label:
        "Aku udah tau kok dosen yang aku usulin bidangnya sesuai sama topik TA aku",
      value: "sesuai topik ta",
    },
    {
      label: "Dosennya ga killer, asik",
      value: "sifat_dosen",
    },
  ];

  const onChangeQ2 = ({ target: { value } }) => {
    setState((prev) => ({ ...prev, reasonQ2: value }));
  };
  const onChangeQ3 = ({ target: { value } }) => {
    setState((prev) => ({ ...prev, reasonQ3: value }));
  };
  const onChangeQ4 = ({ target: { value } }) => {
    setState((prev) => ({ ...prev, reasonQ4: value }));
  };

  return (
    <Form
      name="basic"
      initialValues={{
        q2: "beralasan",
        q3: "beda",
        q4: "ga dibolehin",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      scrollToFirstError
    >
      <Form.Item
        label={<Typography.Text strong>1. Nama</Typography.Text>}
        name="q1"
        rules={[
          {
            required: true,
            message: "Pilih dulu pliss :(",
          },
        ]}
        labelCol={{ span: 24 }}
      >
        <Select
          showSearch
          style={{
            width: "100%",
          }}
          options={sortArr(listOptionNamaMHS, "label")}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
      <Divider />

      <Typography.Text strong>
        2. Kamu sewaktu ngusulin dospem di link{" "}
        <Typography.Link target="_blank" href="http://bit.ly/JudulPA-TA23">
          http://bit.ly/JudulPA-TA23
        </Typography.Link>
        , kamu ngusulinnya berdasarkan apa yah ?
      </Typography.Text>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Isi dulu pliss :(",
          },
        ]}
        labelCol={{ span: 24 }}
        name="q2"
      >
        <Radio.Group
          options={listOptionsQ2}
          onChange={onChangeQ2}
          value="beralasan"
          optionType="button"
          style={{ marginTop: 12, display: "flex" }}
        />
      </Form.Item>

      {state?.reasonQ2 === "beralasan" && (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "5px 30px",
            borderRadius: 20,
            marginLeft: xs ? 5 : 20,
          }}
        >
          <Form.Item
            label="Alasannya apa yah 😁 ? (Kamu bisa nambah listnya kok)"
            name="reason_Q3"
            rules={[
              {
                required: true,
                message: "Tolong isi ya ges alasannya",
              },
            ]}
            labelCol={{ span: 24 }}
          >
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="-- Pilih Alasan --"
              options={listOptionsReasonQ2}
            />
          </Form.Item>
        </div>
      )}
      <Divider />

      <Typography.Text strong>
        3. Dosen yang kamu usulkan itu, beda ga ya sama dosen pembimbing yang
        kamu dapetin skrg ??
      </Typography.Text>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Isi dulu pliss :(",
          },
        ]}
        labelCol={{ span: 24 }}
        name="q3"
      >
        <Radio.Group
          options={listOptionsQ3}
          onChange={onChangeQ3}
          value="beda"
          optionType="button"
          style={{ marginTop: 12 }}
        />
      </Form.Item>
      <Divider />

      <Typography.Text strong>
        4.Apakah topik TA yang kamu kirim di link{" "}
        <Typography.Link target="_blank" href="http://bit.ly/JudulPA-TA23">
          http://bit.ly/JudulPA-TA23
        </Typography.Link>
        , itu masih sama/dibolehin sama dospem yang skrg ?? (Maksudnya misal
        kamu pertama kali ngajuin SPK nih, eh sama dospem sekarang tu ga
        dibolehin)
      </Typography.Text>
      <Form.Item
        name="q4"
        rules={[
          {
            required: true,
            message: "Isi dulu pliss :(",
          },
        ]}
        labelCol={{ span: 24 }}
      >
        <Radio.Group
          options={listOptionsQ4}
          onChange={onChangeQ4}
          value="kurang"
          optionType="button"
          style={{ marginTop: 12 }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          loading={state.isLoadingSubmitBtn}
          type="primary"
          htmlType="submit"
          size="large"
          block
          className="btn-submit"
          style={{ justifyContent: "center" }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormQ;
