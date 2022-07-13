# See
# https://github.com/pnpm/pnpm/issues/3114
# https://github.com/pnpm/pnpm/issues/1637
# https://github.com/pnpm/pnpm/issues/4378

FROM node:18-alpine AS base
RUN apk update
RUN corepack enable
RUN corepack prepare pnpm@7.5.1 --activate
# ENV CI=true
WORKDIR /app

# HACK this is the hack to get the repo structure dir list
# `pnpm fetch` fails with ENOENT if there are no workspace project
# directories present
# it is extracted to a separate stage since COPY . . will always retrigger
FROM base AS list-workspaces
COPY . .
# RUN pnpm list -r --depth -1 --parseable | sed -r "s:^$PWD/?::" > WORKSPACES.txt
RUN pnpm list -r --depth -1 --parseable > WORKSPACES.txt


FROM base AS fetcher
#>>> creating empty dirs for workspaces because of pnpm fetch ENOENT failure
COPY --from=list-workspaces /app/WORKSPACES.txt .
RUN xargs mkdir -p < WORKSPACES.txt
#<<<
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm fetch --frozen-lockfile

FROM fetcher as dev
ARG SCOPE
ENV SCOPE=${SCOPE}
COPY . .
RUN pnpm --filter "${SCOPE}..." install --frozen-lockfile --unsafe-perm
RUN pnpm --filter "${SCOPE}^..." --if-present build
RUN pnpm --filter "${SCOPE}" --if-present test
RUN pnpm --filter "${SCOPE}" build

FROM dev AS isolated
# using experimental `deploy` pnpm command to isolate selected project
# with prod deps.
RUN pnpm --filter "${SCOPE}" deploy dist/isolated


FROM base
COPY --from=isolated /app/dist/isolated .
CMD pnpm start
