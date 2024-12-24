import {Text} from "@chakra-ui/react";

type iSalary = {
    salaryType: "from" | "to";
    salary: number;
    currency?: string;
}

const Salary = (props: iSalary) => {
    return (
        <Text fontSize={"16px"}>
            {props.salaryType === "from" ? "от " : "до "}
            <Text as={"span"} fontWeight={600}>{props.salary + " " + props.currency}</Text>
        </Text>
    )
}

export default Salary
