module.exports = {
  operationName: "GetUpcomingProjectsQuery",
  variables: {
    conditions: [
      {
        user_timestamp: {
          timestamp: 1637421571541,
          locale: "en-US",
          timezone: "America/Los_Angeles",
        },
      },
    ],
    order_by: {
      field_name: "launch_date",
      sort_order: "ASC",
    },
    pagination_info: {
      page_size: 2000,
    },
  },
  query:
    "query GetUpcomingProjectsQuery($conditions: [GetUpcomingProjectsCondition!], $order_by: [OrderConfig!], $pagination_info: PaginationConfig) {\n  getUpcomingProjects(\n    conditions: $conditions\n    order_by: $order_by\n    pagination_info: $pagination_info\n  ) {\n    upcoming_projects {\n      project_name\n      protocol\n      twitter\n      discord\n      website\n      display_name\n      supply\n      description\n      launch_timestamp\n      launch_date\n      mint_site\n      img_url\n      price\n      __typename\n    }\n    __typename\n  }\n}\n",
};
