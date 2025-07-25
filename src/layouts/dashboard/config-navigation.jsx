import { useMemo } from "react";

import { paths } from "src/routes/paths";

import { useTranslate } from "src/locales";

import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon("ic_job"),
  blog: icon("ic_blog"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  tour: icon("ic_tour"),
  order: icon("ic_order"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  product: icon("ic_product"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();
  const data = useMemo(
    () => [
      // default roles : All roles can see this entry.
      // roles: ['user'] Only users can see this item.
      // roles: ['admin'] Only admin can see this item.
      // roles: ['admin', 'manager'] Only admin/manager can see this item.
      // Reference from 'src/guards/RoleBasedGuard'.
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t("overview"),
        items: [
          {
            title: t("dashboard"),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
          {
            title: t("units"),
            path: paths.dashboard.units,
            icon: ICONS.ecommerce,
          },
          { title: t("fts"), path: paths.dashboard.fts, icon: ICONS.analytics },
          {
            title: t("tanks"),
            path: paths.dashboard.tanks,
            icon: ICONS.analytics,
          },
          { title: t("fus"), path: paths.dashboard.fus, icon: ICONS.analytics },
          {
            title: t("night_report"),
            // path: paths.dashboard.nightReport,
            path: "#",
            disabled: true,
            icon: ICONS.disabled,
            caption: "لم يتم الانتهاء منها" /* roles: ['manager'] */,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t(""),
        items: [
          {
            title: t("sequence"),
            roles: ["admin", "manager"],
            path: paths.dashboard.sequences.root,
            icon: ICONS.user,
            children: [
              { title: t("secUnits"), path: paths.dashboard.sequences.units },
              { title: t("secFts"), path: paths.dashboard.sequences.fts },
            ],
          },
          {
            title: t("search"),
            path: paths.dashboard.search.root,
            icon: ICONS.user,
            roles: ["admin", "manager"],
            children: [
              {
                title: t("operating_data"),
                path: paths.dashboard.search.search,
              },
              { title: t("cars_data"), path: paths.dashboard.search.vehicles },
            ],
          },
          {
            title: t("safety"),
            path: paths.dashboard.safety.root,
            icon: ICONS.user,
            children: [
              {
                title: t("safe_work_procedure"),
                path: paths.dashboard.safety.swp,
              },
              {
                title: t("task_risk_assessment"),
                path: paths.dashboard.safety.tra,
              },
              {
                title: t("topic"),
                path: "#",
                disabled: true,
                icon: ICONS.disabled,
                caption:
                  "تم تعطيل هذه الميزة من الإدارة" /* roles: ['manager'] */,
              },
            ],
          },
          {
            title: t("forms"),
            path: paths.dashboard.forms.root,
            icon: ICONS.user,
            children: [
              {
                title: t("data_sheets"),
                path: paths.dashboard.forms.datasheets,
              },
              { title: t("wcm"), path: paths.dashboard.forms.wcm },
              {
                title: t("safety_forms"),
                path: "#",
                disabled: true,
                icon: ICONS.disabled,
                caption:
                  "تم تعطيل هذه الميزة من الإدارة" /* roles: ['manager'] */,
              },
              {
                title: t("my_files"),
                path: "#",
                icon: ICONS.disabled,
                disabled: true,
                caption:
                  "تم تعطيل هذه الميزة من الإدارة" /* roles: ['manager'] */,
              },
            ],
          },
          {
            title: t("control_panel"),
            path: paths.dashboard.administration.root,
            icon: ICONS.user,
            children: [
              {
                title: t("my_profile"),
                path: paths.dashboard.administration.myProfile,
              },
              {
                title: t("my_group"),
                path: paths.dashboard.administration.myGroup,
              },
              {
                title: t("operation_dev"),
                path: paths.dashboard.administration.operationManagement,
              },
              {
                title: t("web_site"),
                path: paths.dashboard.administration
                  .siteManagement /* roles: ['manager'] */,
              },
            ],
          },
        ],
      },

      {
        subheader: t("dcs_dashboard"),
        items: [
          {
            title: t("general_notes"),
            path: paths.dashboard.notes,
            icon: ICONS.dashboard,
          },
          {
            title: t("private_discation"),
            path: paths.dashboard.privateDiscution,
            icon: ICONS.ecommerce,
          },
          {
            title: t("أخرى"),
            path: "#",
            icon: ICONS.disabled,
            disabled: true,
            caption: "تم تعطيل هذه الميزة من الإدارة",
          },
        ],
      },
    ],
    [t],
  );

  return data;
}
