import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import moment from "moment";

export function ChartTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
    if (active) {
        return (
            <div className="tooltip">
                <p style={{fontWeight: 600}}>{moment(label, "YYYY-MM-DD").format("DD.MM.YYYY")}</p>
                <p>{payload!![0].value} поинтов</p>
            </div>
        );
    }
    return null;
}