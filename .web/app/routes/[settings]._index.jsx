import {Fragment,useCallback,useContext,useEffect} from "react"
import {Box as RadixThemesBox,Button as RadixThemesButton,Callout as RadixThemesCallout,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Separator as RadixThemesSeparator,Text as RadixThemesText,TextArea as RadixThemesTextArea,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,Check as LucideCheck,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,TriangleAlert as LucideTriangleAlert,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Button_ad950eef36606bc347c06517d8c5cdd1 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_535d968c0921addd2173f5a8140773f0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.refresh_settings", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_535d968c0921addd2173f5a8140773f0,variant:"outline"},"Refresh")
  )
}


function Callout__text_d7a27fc285d73cebdeb10c2a4e54707f () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___settings____settings_state.error_message_rx_state_)
  )
}


function Fragment_456bce82b75be73cf16f70736ce50fe8 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___settings____settings_state.error_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"red",css:({ ["icon"] : "triangle_alert", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideTriangleAlert,{},)),jsx(Callout__text_d7a27fc285d73cebdeb10c2a4e54707f,{},)))):(jsx(Fragment,{},))))
  )
}


function Callout__text_1a4553474ea644c7fca0c27929a49382 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___settings____settings_state.success_message_rx_state_)
  )
}


function Fragment_8ea7cd086c89ebf2da2b878a8f6de201 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___settings____settings_state.success_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"green",css:({ ["icon"] : "check", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideCheck,{},)),jsx(Callout__text_1a4553474ea644c7fca0c27929a49382,{},)))):(jsx(Fragment,{},))))
  )
}


function Debounceinput_5def13928d5c2dc24e0575a39c8f5bef () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_303bb0e12f7fbb44cec8f645e16f20c1 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_business_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_303bb0e12f7fbb44cec8f645e16f20c1,placeholder:"Business Name *",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.business_name_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.business_name_rx_state_ : "")},)
  )
}


function Debounceinput_9a889de1c4ef17a5f1b549c191c5816f () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_c9d707fa686d01498b45151da4383f8e = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_business_gstin", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_c9d707fa686d01498b45151da4383f8e,placeholder:"GSTIN",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.business_gstin_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.business_gstin_rx_state_ : "")},)
  )
}


function Debounceinput_79877043a5d6fda4114f1d43547c5f6a () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_7924114071aaf34b880afdd8e24995a9 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_business_address", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_7924114071aaf34b880afdd8e24995a9,placeholder:"Address",value:reflex___state____state__state____global_state__pages___settings____settings_state.business_address_rx_state_},)
  )
}


function Debounceinput_9c41de8052c62260fd527faa07732490 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_968abd7cb3988865e0f07a769b8ea6c1 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_business_city", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_968abd7cb3988865e0f07a769b8ea6c1,placeholder:"City",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.business_city_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.business_city_rx_state_ : "")},)
  )
}


function Debounceinput_906be682590e7bc5584f33f2518cc413 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_b56af96443828cd21f38b061ec387d6f = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_business_state", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_b56af96443828cd21f38b061ec387d6f,placeholder:"State",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.business_state_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.business_state_rx_state_ : "")},)
  )
}


function Debounceinput_8d582ab425d5f7a9cf609da6af95dcc1 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_48dcd342e521210726851cdc9d543cc0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_business_pincode", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_48dcd342e521210726851cdc9d543cc0,placeholder:"Pincode",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.business_pincode_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.business_pincode_rx_state_ : "")},)
  )
}


function Debounceinput_961d7c1e21bc85da12246ba4d8d7fe22 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_804c9e6bfcbaef4538e66cbc738c0900 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_business_phone", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_804c9e6bfcbaef4538e66cbc738c0900,placeholder:"Phone",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.business_phone_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.business_phone_rx_state_ : "")},)
  )
}


function Debounceinput_808abc7fb9a3e455bc8e32fb2c41107d () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_27b77bae357040e82e046780de68bdf5 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_business_email", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_27b77bae357040e82e046780de68bdf5,placeholder:"Email",type:"email",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.business_email_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.business_email_rx_state_ : "")},)
  )
}


function Button_59a5d2806001602d05ac29cf731db7a0 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_9b91fe57be768832c4d18170dd20b1f4 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.save_business_profile", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["width"] : "100%" }),onClick:on_click_9b91fe57be768832c4d18170dd20b1f4},"Save Business Profile")
  )
}


function Debounceinput_59e832f625f640b19af28290f1fd9012 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_13ea6161d40c7b6d60a6c0e668232c15 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_sales_prefix", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_13ea6161d40c7b6d60a6c0e668232c15,value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.sales_prefix_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.sales_prefix_rx_state_ : "")},)
  )
}


function Debounceinput_05fd9df779e318932dae0f14b2bf2dff () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_ff9a3aa3d23dbc2af94857fad5277385 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_sales_start_number", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_ff9a3aa3d23dbc2af94857fad5277385,type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.sales_start_number_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.sales_start_number_rx_state_ : "")},)
  )
}


function Debounceinput_09f704fc3af60a7bdee9822d82ef561d () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_a60e6788adcd48289c646dc2f7486af5 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_purchase_prefix", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_a60e6788adcd48289c646dc2f7486af5,value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.purchase_prefix_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.purchase_prefix_rx_state_ : "")},)
  )
}


function Debounceinput_d0b9b1ed16d9f278800ce6fe94bd2074 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_cc34098f17d5c109974e07e11dd3969a = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_purchase_start_number", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_cc34098f17d5c109974e07e11dd3969a,type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___settings____settings_state.purchase_start_number_rx_state_) ? reflex___state____state__state____global_state__pages___settings____settings_state.purchase_start_number_rx_state_ : "")},)
  )
}


function Debounceinput_9b1ae74ef932eb210ad1b34c949195d7 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_0ee5543cd0889ab9ace4618461228014 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_terms_conditions", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_0ee5543cd0889ab9ace4618461228014,placeholder:"Terms & Conditions",value:reflex___state____state__state____global_state__pages___settings____settings_state.terms_conditions_rx_state_},)
  )
}


function Debounceinput_57905a80c4d3bd46d5ace32a0f242353 () {
  const reflex___state____state__state____global_state__pages___settings____settings_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_0c12fdcc6e85b881e082873812598dc2 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.set_footer_text", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_0c12fdcc6e85b881e082873812598dc2,placeholder:"Footer Text",value:reflex___state____state__state____global_state__pages___settings____settings_state.footer_text_rx_state_},)
  )
}


function Button_575e7be8f78890e94aa5338a3072098e () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_03e5e4efc5c0b0f00f5bab75d5e13aac = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___settings____settings_state.save_invoice_settings", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["width"] : "100%" }),onClick:on_click_03e5e4efc5c0b0f00f5bab75d5e13aac},"Save Invoice Settings")
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Settings"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(Button_ad950eef36606bc347c06517d8c5cdd1,{},)),jsx(Fragment_456bce82b75be73cf16f70736ce50fe8,{},),jsx(Fragment_8ea7cd086c89ebf2da2b878a8f6de201,{},),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["marginBottom"] : "4" }),size:"6"},"Business Profile"),jsx(Debounceinput_5def13928d5c2dc24e0575a39c8f5bef,{},),jsx(Debounceinput_9a889de1c4ef17a5f1b549c191c5816f,{},),jsx(Debounceinput_79877043a5d6fda4114f1d43547c5f6a,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_9c41de8052c62260fd527faa07732490,{},),jsx(Debounceinput_906be682590e7bc5584f33f2518cc413,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_8d582ab425d5f7a9cf609da6af95dcc1,{},),jsx(Debounceinput_961d7c1e21bc85da12246ba4d8d7fe22,{},)),jsx(Debounceinput_808abc7fb9a3e455bc8e32fb2c41107d,{},),jsx(Button_59a5d2806001602d05ac29cf731db7a0,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["marginBottom"] : "4" }),size:"6"},"Invoice Settings"),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"4"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Sales Invoice Prefix"),jsx(Debounceinput_59e832f625f640b19af28290f1fd9012,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Start Number"),jsx(Debounceinput_05fd9df779e318932dae0f14b2bf2dff,{},))),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"4"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Purchase Invoice Prefix"),jsx(Debounceinput_09f704fc3af60a7bdee9822d82ef561d,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Start Number"),jsx(Debounceinput_d0b9b1ed16d9f278800ce6fe94bd2074,{},))),jsx(Debounceinput_9b1ae74ef932eb210ad1b34c949195d7,{},),jsx(Debounceinput_57905a80c4d3bd46d5ace32a0f242353,{},),jsx(Button_575e7be8f78890e94aa5338a3072098e,{},)))))),jsx("title",{},"Settings - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}