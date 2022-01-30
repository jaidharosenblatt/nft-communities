module.exports = {
  operationName: "GetUpcomingProjectsQuery",
  variables: {
    conditions: [
      {
        user_timestamp: {
          timestamp: 1643572710455,
          locale: "en-US",
          timezone: "America/Los_Angeles",
          operation: "GREATER_THAN_OR_EQUAL_TO",
        },
      },
    ],
    order_by: { field_name: "likes", sort_order: "DESC" },
    pagination_info: { page_size: 500 },
  },
  query:
    "query GetUpcomingProjectsQuery($conditions: [GetUpcomingProjectsCondition!], $order_by: [OrderConfig!], $pagination_info: PaginationConfig) {\n  getUpcomingProjectsRaw(\n    conditions: $conditions\n    order_by: $order_by\n    pagination_info: $pagination_info\n  ) {\n    upcoming_projects {\n      project_name\n      protocol\n      twitter\n      discord\n      website\n      display_name\n      supply\n      description\n      launch_timestamp\n      launch_date\n      mint_site\n      img_url\n      price\n      is_moonshot\n      likesCount\n      user_likes {\n        user {\n          twitter\n          tags {\n            tag\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
};
