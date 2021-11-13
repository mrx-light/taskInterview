import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LOGOUT } from "../../actions/Actions";
import { iState, store } from "../../types/types";
import Error from "./Animations/Error/Error";
import ReavilingText from "./Animations/ReavilingText/ReavilingText";
import Loading from "./Animations/Loading/Loading";
import Slide from "./Animations/Slide/Slide";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goTo = (path: string) => {
    navigate(`/${path}`, { replace: true });
  };

  const isLogged: boolean = useSelector((state: store) => {
    return state.loggedin;
  });
  const [logged, setLogged] = useState<boolean>(isLogged);
  const [chart] = useState<any>({
    series: [
      {
        name: "Servings",
        data: [100, 78, 20, 6, 22, 77, 21, 33, 61, 39, 10, 10, 35],
      },
    ],
    options: {
      annotations: {
        points: [
          {
            x: "Apples",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Apples are at the top of the chart",
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: [
          "Apples",
          "Oranges",
          "Strawberries",
          "Pineapples",
          "Mangoes",
          "Bananas",
          "Blackberries",
          "Pears",
          "Watermelons",
          "Cherries",
          "Pomegranates",
          "Tangerines",
          "Papayas",
        ],
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Servings",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  });
  const user: iState = useSelector((state: store) => {
    return state.registration;
  });
  const [userInfo] = useState<iState>(user);
  const logout = () => {
    dispatch(LOGOUT());
    goTo("login");
    setLogged(false);
  };
  useEffect(() => {
    const Render = async () => {
      if (isLogged) {
        return;
      }

      goTo("login");
      return;
    };
    Render();
  }, [logged, goTo, isLogged]);

  return (
    <div className="center">
      <div className="flex">
        <h2 className="textCenter">Home Page</h2>
        <div className="flex">
          <h3 className="pointer space" onClick={() => goTo("login")}>
            Login
          </h3>
          <h3 className="pointer space" onClick={() => goTo("registration")}>
            Registration
          </h3>
        </div>
      </div>
      <div className="box">
        <div className="grid">
          <div className="spaceBettwen">
            <h3 className="">First Name: </h3>
            <h3 className="">{userInfo.firstName}</h3>
          </div>
          <div className="spaceBettwen">
            <h3 className="">Last Name: </h3>
            <h3 className="">{userInfo.lastName}</h3>
          </div>
          <div className="spaceBettwen">
            <h3 className="">Email </h3>
            <h3 className="">{userInfo.email}</h3>
          </div>
          <div className="spaceBettwen">
            <h3 className="">Password </h3>
            <h3 className="">{userInfo.password}</h3>
          </div>
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
      <div>
        <h2 className="textCenter">Animation</h2>
        <Slide />
        <br />
        <br />
        <Loading />
        <ReavilingText />
        <Error />
      </div>
      <div className="margin">
        <h2 className="textCenter">Chart</h2>
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
}

export default Home;
