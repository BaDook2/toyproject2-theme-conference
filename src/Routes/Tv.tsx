import { makeImagePath } from "./utils";
import Slider from "../components/Slider";
import styled from "styled-components";
import { useMultipleFetchingTv } from "../api";

function Tv() {
  const [
    { data: airingData, isLoading: airingIsLoading },
    { data: popularData, isLoading: popularIsLoading },
    { data: topRatedData, isLoading: topRatedIsLoading },
  ] = useMultipleFetchingTv();

  const isLoading = airingIsLoading || popularIsLoading || topRatedIsLoading;
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(airingData?.results[0].backdrop_path || "")}
          >
            <Title>{airingData?.results[0].title}</Title>
            <Overview>{airingData?.results[0].overview}</Overview>
          </Banner>
          <Main>
            <SliderBox>
              <RowTitle>Airing Today</RowTitle>
              <Slider data={airingData} />
            </SliderBox>
            <SliderBox>
              <RowTitle>Popular</RowTitle>
              <Slider data={popularData} />
            </SliderBox>
            <SliderBox>
              <RowTitle>Top Rated</RowTitle>
              <Slider data={topRatedData} />
            </SliderBox>
          </Main>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Main = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 250px;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const RowTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 5;
`;
