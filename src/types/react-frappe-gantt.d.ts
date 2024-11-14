
declare module "react-frappe-gantt" {

    import { Component } from "react";

    export interface Task {
        id: string
        name: string
        start: string
        end: string
        progress: number
    }

    export enum ViewMode { HalfDay = "Half Day", Day = "Day", Week = "Week", Month = "Month"}


    export interface FrappeGanttProps {
        tasks: Task[]
        viewMode?: ViewMode
        onClick?: (task: Task) => void
        onDateChange?: (task: Task, start: string, end: string) => void
        onProgressChange?: (task: Task, progress: number) => void
        onTasksChange?: (task: Task[]) => void
    }

    export class FrappeGantt extends Component<FrappeGanttProps> {}
}