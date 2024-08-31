import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  subTitle: string;
  body: string;
  category?: string;
  titleBody?: string;
  titleCategory?: string;
};

export const DashboardCard = ({
  title,
  subTitle,
  body,
  category,
  titleBody,
  titleCategory,
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-lg">
          {body} {titleBody}
        </h1>
        <h2>
          {category} {titleCategory}
        </h2>
      </CardContent>
    </Card>
  );
};
