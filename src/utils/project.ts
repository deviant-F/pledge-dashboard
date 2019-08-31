export type TProject = {
  category: { name: string };
  main_image: { url: string };
  creator: { name: string };
  start_time: number;
  end_time: number;
  total_pledged: number;
  funding_goal: number;
  blurb: string;
  id: number;
  name: string;
};

export type TFilter = {
  funded: number;
  goal: [number, number];
};

export const getProgessPercentage = ({
  total_pledged,
  funding_goal
}: TProject) => Math.round((total_pledged / funding_goal) * 100);

export const verify = (projects: Array<TProject>) =>
  projects.filter(
    ({ funding_goal, start_time, end_time }) =>
      !!funding_goal && !!start_time && !!end_time
  );

export const applyFilters = (
  projects: Array<TProject>,
  { funded, goal }: TFilter
) =>
  projects.filter(p => {
    const tempState =
      getProgessPercentage(p) >= funded && p.funding_goal / 100 >= goal[0];
    if (goal[1] < 0) {
      return tempState;
    }
    return tempState && p.funding_goal / 100 < goal[1];
  });
