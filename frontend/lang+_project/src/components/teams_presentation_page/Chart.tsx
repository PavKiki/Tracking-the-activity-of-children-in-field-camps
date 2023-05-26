import defaultApi from "api/defaultApi";
import moment from "moment";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";

interface IChart {
    teamTitle: string;
}

export function Chart(props: IChart) {
    useEffect(() => {
        fetchChart()
    }, [])

    const [chart, setChart] = useState<IChart[] | null>(null)

    async function fetchChart() {
        await defaultApi
            .get(
                "points/chart",
                {
                    params: {
                        title: props.teamTitle
                    }
                }
            )
            .then(response => {
                setChart(response.data)
            })
            .catch (error => {
                console.log(error)
            })
    }

    return (
        <>
        <div className="chart">
            {chart && <ResponsiveContainer width="70%" height={300}>
                <AreaChart data={chart}>
                    <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                        <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                    </linearGradient>
                    </defs>

                    <Area dataKey="points" stroke="#2451B7" fill="url(#color)" />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(str) => {
                            return moment(str, "YYYY-MM-DD").format("MMM, DD");
                        }}
                    />

                    <YAxis
                        dataKey="points"
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                    />

                    <Tooltip content={<ChartTooltip/>}/>

                    <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
            }
        </div>
        </>
    )
}