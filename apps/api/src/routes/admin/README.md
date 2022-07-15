# Blog Admin
Restricted area to manage author's content

Auth has three distinct phases here:
1. JWT user auth via `Authorization` bearer header
2. Specific blog routes with `:blogId` param are verified that user has access to this blog
3. Specific entity routes with `:id` param are verified that entity belongs to the authorized blog from step 2.
