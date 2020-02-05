import React from 'react';
import  {VictoryChart, VictoryGroup, VictoryStack, VictoryArea, VictoryTheme}  from 'victory';

const analysisChartGroup = (props) => {
    return (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryGroup
            style={{
              data: { strokeWidth: 1, fillOpacity: 0.4 }
            }}
          >
            <VictoryArea
              style={{
                data: { fill: "green", stroke: "black" }
              }}
              data={props.data}
            />
            
          </VictoryGroup>
        </VictoryChart>
      );
}

const analysisChartStack = (props) => {

    let vaList = props.dataList.map((data) => {
        return (
            <VictoryArea
              style={{
                data: { fill: "green", stroke: "black" }
              }}
              data={data}
            />            
        )
    })

    return (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryStack
            style={{
              data: { strokeWidth: 1, fillOpacity: 0.4 }
            }}
          >
            {vaList}
            
          </VictoryStack>
        </VictoryChart>
      );
}

export {analysisChartGroup, analysisChartStack}