import {Fragment,useCallback,useContext,useEffect} from "react"
import {Badge as RadixThemesBadge,Box as RadixThemesBox,Button as RadixThemesButton,Callout as RadixThemesCallout,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Select as RadixThemesSelect,Separator as RadixThemesSeparator,Spinner as RadixThemesSpinner,Table as RadixThemesTable,Text as RadixThemesText,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,Check as LucideCheck,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,TriangleAlert as LucideTriangleAlert,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Button_b26604e00e36dc4516a4144eb5e8b288 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_7314ef212e935553367e78bf95046367 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.refresh_users", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_7314ef212e935553367e78bf95046367,variant:"outline"},"Refresh")
  )
}


function Button_d3905e6b009b620ead1833099d2b27ef () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_1067fe23270a64b6d47c73960174b50c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.open_create_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["icon"] : "plus" }),onClick:on_click_1067fe23270a64b6d47c73960174b50c},"Add User")
  )
}


function Callout__text_27f80535b19b9dee62fa66c154f2d866 () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___users____user_state.error_message_rx_state_)
  )
}


function Fragment_a60348c9f4f6b62166e9165c7e6098d6 () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___users____user_state.error_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"red",css:({ ["icon"] : "triangle_alert", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideTriangleAlert,{},)),jsx(Callout__text_27f80535b19b9dee62fa66c154f2d866,{},)))):(jsx(Fragment,{},))))
  )
}


function Callout__text_cb7858914095b255ed9e0cbb72156337 () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___users____user_state.success_message_rx_state_)
  )
}


function Fragment_0e1665d0a88265a4ab706ca56e24d01b () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___users____user_state.success_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"green",css:({ ["icon"] : "check", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideCheck,{},)),jsx(Callout__text_cb7858914095b255ed9e0cbb72156337,{},)))):(jsx(Fragment,{},))))
  )
}


function Debounceinput_e5558f5f5cc36b61f79182d60ff347ef () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_15c6693ff3d282611d58bd22e81fb411 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.set_form_username", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_15c6693ff3d282611d58bd22e81fb411,placeholder:"Username *",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___users____user_state.form_username_rx_state_) ? reflex___state____state__state____global_state__pages___users____user_state.form_username_rx_state_ : "")},)
  )
}


function Debounceinput_688b8d806899876a8643429e625fcdbd () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_e013955705e462d26ba6a88e4ae74651 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.set_form_email", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_e013955705e462d26ba6a88e4ae74651,placeholder:"Email *",type:"email",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___users____user_state.form_email_rx_state_) ? reflex___state____state__state____global_state__pages___users____user_state.form_email_rx_state_ : "")},)
  )
}


function Debounceinput_089e16075f88c1b6c4d210ec8ae2c048 () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_790fdba3e34f9b7ececf2b0de2611b36 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.set_form_full_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_790fdba3e34f9b7ececf2b0de2611b36,placeholder:"Full Name",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___users____user_state.form_full_name_rx_state_) ? reflex___state____state__state____global_state__pages___users____user_state.form_full_name_rx_state_ : "")},)
  )
}


function Select__root_2c36e179617455016a656f12fd75bfe9 () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_8d55fa0eee8a01ebe228b7ae51cbf305 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.set_form_role", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesSelect.Root,{onValueChange:on_change_8d55fa0eee8a01ebe228b7ae51cbf305,value:reflex___state____state__state____global_state__pages___users____user_state.form_role_rx_state_},jsx(RadixThemesSelect.Trigger,{css:({ ["width"] : "100%" })},),jsx(RadixThemesSelect.Content,{},jsx(RadixThemesSelect.Group,{},"",jsx(RadixThemesSelect.Item,{value:"ADMIN"},"ADMIN"),jsx(RadixThemesSelect.Item,{value:"BILLING"},"BILLING"),jsx(RadixThemesSelect.Item,{value:"VIEWER"},"VIEWER"))))
  )
}


function Debounceinput_a855c435307396a38479b76701b81498 () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_a6f62685f03cdee6b5a7486ba088bf18 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.set_form_password", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_a6f62685f03cdee6b5a7486ba088bf18,placeholder:"Password *",type:"password",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___users____user_state.form_password_rx_state_) ? reflex___state____state__state____global_state__pages___users____user_state.form_password_rx_state_ : "")},)
  )
}


function Button_f90ce23a6e522a5968fd3b2722c92e67 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_2191be9880a1c60f7e52ae22205b36c0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.set_show_form", ({ ["value"] : false }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_2191be9880a1c60f7e52ae22205b36c0,variant:"outline"},"Cancel")
  )
}


function Button_21aa0ec9cb183366974bb842595d8b64 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_a0a1dc29be9f662b4dbcd7f9fe4791a5 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.save_user", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",onClick:on_click_a0a1dc29be9f662b4dbcd7f9fe4791a5},"Save")
  )
}


function Fragment_2aa7f11fadb9ebe2d30ccf3c90605349 () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___users____user_state.show_form_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{size:"6"},"Add New User"),jsx(Debounceinput_e5558f5f5cc36b61f79182d60ff347ef,{},),jsx(Debounceinput_688b8d806899876a8643429e625fcdbd,{},),jsx(Debounceinput_089e16075f88c1b6c4d210ec8ae2c048,{},),jsx(Select__root_2c36e179617455016a656f12fd75bfe9,{},),jsx(Debounceinput_a855c435307396a38479b76701b81498,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Button_f90ce23a6e522a5968fd3b2722c92e67,{},),jsx(Button_21aa0ec9cb183366974bb842595d8b64,{},)))))):(jsx(Fragment,{},))))
  )
}


function Table__body_3dd857b143d2b80ea379ef0aa8d34a36 () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___users____user_state.user_indices_rx_state_ ?? [],((idx_rx_state_,index_a6af3ba18be92a6fe2d8bfec5feb6731)=>(jsx(RadixThemesTable.Row,{key:index_a6af3ba18be92a6fe2d8bfec5feb6731},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___users____user_state.usernames_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___users____user_state.emails_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},(!((reflex___state____state__state____global_state__pages___users____user_state.full_names_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === ""?.valueOf?.())) ? reflex___state____state__state____global_state__pages___users____user_state.full_names_rx_state_?.at?.(idx_rx_state_) : "-")),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___users____user_state.roles_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},jsx(Fragment,{},(reflex___state____state__state____global_state__pages___users____user_state.is_active_flags_rx_state_?.at?.(idx_rx_state_)?(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"green"},"Active"))):(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"gray"},"Inactive")))))),jsx(RadixThemesTable.Cell,{},jsx(RadixThemesButton,{color:"red",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___users____user_state.delete_user", ({ ["user_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"1",variant:"outline"},"Deactivate")))))))
  )
}


function Fragment_c00816645b26b8e51860350c6085e6ce () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___users____user_state.user_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"Username"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Email"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Full Name"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Role"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Status"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Actions"))),jsx(Table__body_3dd857b143d2b80ea379ef0aa8d34a36,{},)))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No users found.")))))
  )
}


function Fragment_3ccf5b065504d37e18c1e7aba0640b02 () {
  const reflex___state____state__state____global_state__pages___users____user_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___users____user_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___users____user_state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["padding"] : "8" })},jsx(RadixThemesSpinner,{},)))):(jsx(Fragment_c00816645b26b8e51860350c6085e6ce,{},))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Users & Roles"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(Button_b26604e00e36dc4516a4144eb5e8b288,{},),jsx(Button_d3905e6b009b620ead1833099d2b27ef,{},))),jsx(Fragment_a60348c9f4f6b62166e9165c7e6098d6,{},),jsx(Fragment_0e1665d0a88265a4ab706ca56e24d01b,{},),jsx(Fragment_2aa7f11fadb9ebe2d30ccf3c90605349,{},),jsx(Fragment_3ccf5b065504d37e18c1e7aba0640b02,{},)))),jsx("title",{},"Users - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}