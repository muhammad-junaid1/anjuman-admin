/* eslint-disable */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { BiCaretDown } from "react-icons/bi";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const resetDropdown = () => {
    setActiveDropdown(null);
    setActiveSubMenu(null);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.layout === "/admin" && route?.sidebar) {
        return (
          <div
            className={`py-2 ${
              activeDropdown === index &&
              route?.children?.length &&
              "bg-blue-100"
            }`}
          >
            {route?.children?.length > 0 ? (
              <div
                onClick={() =>
                  setActiveDropdown((active) =>
                    active === index ? null : index
                  )
                }
                className="relative flex hover:cursor-pointer"
              >
                <li
                  className="my-[3px] flex w-full cursor-pointer items-center px-8"
                  key={index}
                >
                  <span
                    className={`${
                      activeRoute(route.path) === true
                        ? "font-bold text-brand-500 dark:text-white"
                        : "text-black font-medium"
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                  <p
                    className={`leading-1 ml-4 flex flex-1 ${
                      activeRoute(route.path) === true
                        ? "font-bold text-navy-700 dark:text-white"
                        : "text-black font-medium"
                    }`}
                  >
                    {route.name}
                  </p>

                  {activeDropdown === index ? (
                    <IoCaretUpOutline size={20} />
                  ) : (
                    <IoCaretDownOutline size={20} />
                  )}
                </li>
                {activeRoute(route.path) ? (
                  <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </div>
            ) : (
              <Link
                onClick={resetDropdown}
                key={index}
                to={route.layout + "/" + route.path}
              >
                <div className="relative flex hover:cursor-pointer">
                  <li
                    className="my-[3px] flex cursor-pointer items-center px-8"
                    key={index}
                  >
                    <span
                      className={`${
                        activeRoute(route.path) === true
                          ? "font-bold text-brand-500 dark:text-white"
                          : "font-medium text-gray-600"
                      }`}
                    >
                      {route.icon ? route.icon : <DashIcon />}{" "}
                    </span>
                    <p
                      className={`leading-1 ml-4 flex ${
                        activeRoute(route.path) === true
                          ? "font-bold text-navy-700 dark:text-white"
                          : "font-medium text-gray-600"
                      }`}
                    >
                      {route.name}
                    </p>
                  </li>
                  {(route?.children?.length && activeDropdown === index) ||
                  (!route?.children?.length && activeRoute(route.path)) ? (
                    <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                  ) : null}
                </div>
              </Link>
            )}
            {(route?.children?.length && activeDropdown === index) > 0 && (
              <div className="ml-9">
                {route.children?.map((sr, index) => {
                  return (
                    <Link
                      onClick={() => setActiveSubMenu(index)}
                      key={index}
                      to={sr.layout + "/" + sr.path}
                    >
                      <div className="relative flex hover:cursor-pointer">
                        <li
                          className={`${
                            activeSubMenu === index &&
                            "font-bold text-[#412afe]"
                          } my-[3px] flex cursor-pointer items-center px-8`}
                          key={index}
                        >
                          {sr.name}
                        </li>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
