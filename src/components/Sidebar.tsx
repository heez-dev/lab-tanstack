import { Link } from "@tanstack/react-router";

const routeFiles = import.meta.glob([
  "../routes/**/*.tsx",
  "!../routes/{__root,index}.tsx",
]);

interface NavigationItem {
  depth: number;
  isFolderIndex: boolean;
  label: string;
  to: string;
}

function formatLabel(segment: string) {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function createNavigationItems(): NavigationItem[] {
  return Object.keys(routeFiles)
    .flatMap((filePath) => {
      const routePath = filePath
        .replace("../routes/", "")
        .replace(/\.tsx$/, "");
      const segments = routePath.split("/");
      const fileName = segments.at(-1);

      if (
        !fileName ||
        routePath === "index" ||
        segments.some((segment) => segment.startsWith("_"))
      ) {
        return [];
      }

      const pathSegments =
        fileName === "index"
          ? segments.slice(0, -1)
          : segments.flatMap((segment) => segment.split("."));
      const labelSegment = pathSegments.at(-1);

      if (!labelSegment) {
        return [];
      }

      return [
        {
          depth: Math.max(pathSegments.length - 1, 0),
          isFolderIndex: fileName === "index",
          label: formatLabel(labelSegment),
          to: `/${pathSegments.join("/")}`,
        },
      ];
    })
    .sort((left, right) => left.to.localeCompare(right.to));
}

const navigationItems = createNavigationItems();
const navigationGroups = navigationItems
  .filter((item) => item.isFolderIndex && item.depth === 0)
  .map((folder) => ({
    ...folder,
    children: navigationItems.filter((item) =>
      item.to.startsWith(`${folder.to}/`),
    ),
  }));
const standaloneItems = navigationItems.filter(
  (item) => !item.isFolderIndex && item.depth === 0,
);

function SidebarLink({
  item,
  label = item.label,
}: {
  item: NavigationItem;
  label?: string;
}) {
  return (
    <Link
      to={item.to}
      className="block rounded-lg px-3 py-2.5 text-slate-300 no-underline transition-colors hover:bg-slate-800 hover:text-white"
      activeProps={{
        className:
          "bg-accent font-semibold text-slate-950 hover:bg-accent-dark hover:text-slate-950",
      }}
      activeOptions={{ exact: true }}
    >
      {label}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="border-r border-slate-700 bg-slate-900 px-2.5 py-6 text-slate-200 sm:px-4">
      <div className="px-1.5 pb-6 text-sm font-bold tracking-tight sm:px-3 sm:text-lg">
        <Link
          to="/"
          className="text-slate-200 no-underline transition-colors hover:text-white"
        >
          <span className="text-accent">TanStack</span> Lab
        </Link>
      </div>

      <nav aria-label="Main navigation" className="text-xs">
        <ul className="grid list-none gap-1.5 p-0">
          {standaloneItems.map((item) => (
            <li key={item.to}>
              <SidebarLink item={item} />
            </li>
          ))}

          {navigationGroups.map((group) => (
            <li key={group.to}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800 hover:text-white [&::-webkit-details-marker]:hidden">
                  {group.label}
                  <svg
                    aria-hidden="true"
                    className="size-4 transition-transform group-open:rotate-90"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="m7.5 5 5 5-5 5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.75"
                    />
                  </svg>
                </summary>

                <ul className="mt-1 grid list-none gap-1 border-l border-slate-700 pl-2">
                  <li>
                    <SidebarLink item={group} label="Overview" />
                  </li>
                  {group.children.map((item) => (
                    <li key={item.to}>
                      <SidebarLink item={item} />
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
